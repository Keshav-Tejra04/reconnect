import React, { useState, useEffect } from 'react';
import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot
} from 'firebase/firestore';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { db, storage, auth } from '../firebase';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const ResumeReview = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [resumeUrl, setResumeUrl] = useState('');
    const [reviews, setReviews] = useState([]);
    const [isAlumni, setIsAlumni] = useState(false);
    const [pendingReviews, setPendingReviews] = useState([]);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists() && userDoc.data().role === 'alumni') {
                    setIsAlumni(true);
                    loadPendingReviews();
                }
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isAlumni && auth.currentUser) {
            const unsubscribe = onSnapshot(
                doc(db, "resumes", auth.currentUser.uid),
                (doc) => {
                    if (doc.exists()) {
                        setResumeUrl(doc.data().url);
                    }
                }
            );

            const reviewsQuery = query(
                collection(db, "reviews"),
                where("studentId", "==", auth.currentUser.uid)
            );
            const reviewsUnsubscribe = onSnapshot(reviewsQuery, (snapshot) => {
                setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });

            return () => {
                unsubscribe();
                reviewsUnsubscribe();
            };
        }
    }, [isAlumni]);

    const loadPendingReviews = async () => {
        const q = query(
            collection(db, "resumes"),
            where("needsReview", "==", true)
        );
        const snapshot = await getDocs(q);
        setPendingReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const uploadResume = async () => {
        if (!resumeFile) return;

        try {
            const storageRef = ref(storage, `resumes/${auth.currentUser.uid}/${resumeFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, resumeFile);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await setDoc(doc(db, "resumes", auth.currentUser.uid), {
                        url: downloadURL,
                        studentId: auth.currentUser.uid,
                        studentName: auth.currentUser.displayName || 'Anonymous',
                        uploadedAt: new Date(),
                        needsReview: true
                    });
                    setResumeUrl(downloadURL);
                    setUploadProgress(0);
                    alert('Resume uploaded successfully!');
                }
            );
        } catch (error) {
            console.error("Error uploading resume:", error);
            alert('Error uploading resume. Please try again.');
        }
    };

    const submitReview = async (resumeId) => {
        if (!feedback.trim()) return;

        try {
            await addDoc(collection(db, "reviews"), {
                resumeId,
                studentId: pendingReviews.find(r => r.id === resumeId).studentId,
                reviewerId: auth.currentUser.uid,
                reviewerName: auth.currentUser.displayName || 'Alumni',
                feedback,
                createdAt: new Date()
            });

            await updateDoc(doc(db, "resumes", resumeId), {
                needsReview: false
            });

            setFeedback('');
            loadPendingReviews();
            alert('Review submitted successfully!');
        } catch (error) {
            console.error("Error submitting review:", error);
            alert('Error submitting review. Please try again.');
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="resume-review-page">
                    <h1>Resume/CV Review System</h1>

                    {!isAlumni ? (
                        <div className="student-view">
                            <div className="upload-section">
                                <h2>Upload Your Resume</h2>
                                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                                <button
                                    onClick={uploadResume}
                                    disabled={!resumeFile || uploadProgress > 0}
                                >
                                    {uploadProgress > 0 ? `Uploading... ${Math.round(uploadProgress)}%` : 'Upload Resume'}
                                </button>

                                {resumeUrl && (
                                    <div className="resume-preview">
                                        <h3>Your Current Resume:</h3>
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                            View Resume
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="reviews-section">
                                <h2>Feedback Received</h2>
                                {reviews.length > 0 ? (
                                    reviews.map(review => (
                                        <div key={review.id} className="review-card">
                                            <div className="review-header">
                                                <span className="reviewer">{review.reviewerName}</span>
                                                <span className="date">
                                                    {new Date(review.createdAt?.toDate()).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="feedback">{review.feedback}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No feedback yet. Your resume will appear here after an alumni reviews it.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="alumni-view">
                            <h2>Resumes Needing Review</h2>
                            {pendingReviews.length > 0 ? (
                                pendingReviews.map(resume => (
                                    <div key={resume.id} className="resume-card">
                                        <div className="resume-header">
                                            <span className="student-name">{resume.studentName}</span>
                                            <a
                                                href={resume.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="view-resume"
                                            >
                                                View Resume
                                            </a>
                                        </div>
                                        <textarea
                                            placeholder="Provide constructive feedback..."
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            rows="5"
                                        />
                                        <button
                                            onClick={() => submitReview(resume.id)}
                                            disabled={!feedback.trim()}
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No resumes currently need review. Check back later!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeReview;