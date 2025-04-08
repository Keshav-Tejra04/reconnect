import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, addDoc, getDocs, getDoc,
    query, where, orderBy, doc, setDoc, updateDoc, onSnapshot
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable,
    deleteObject
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBxtpuZXWkQIc04fo1FCPpi3VMZ2f7nCZk",
    authDomain: "reconnect-4932e.firebaseapp.com",
    projectId: "reconnect-4932e",
    storageBucket: "reconnect-4932e.appspot.com",
    messagingSenderId: "711784761424",
    appId: "1:711784761424:web:abe3af9d7f2110111ce955",
    measurementId: "G-8R9FR1DW0W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ==================== RESUME REVIEW SYSTEM ====================

/**
 * Uploads a resume to Firebase Storage and creates/updates the resume document
 * @param {string} userId - The user's UID
 * @param {File} file - The resume file to upload
 * @param {string} studentName - The student's display name
 * @returns {Promise<string>} The download URL of the uploaded resume
 */
export const uploadResume = async (userId, file, studentName) => {
    try {
        // Delete previous resume if exists
        const prevResume = await getDoc(doc(db, "resumes", userId));
        if (prevResume.exists() && prevResume.data().url) {
            try {
                const prevRef = ref(storage, prevResume.data().url);
                await deleteObject(prevRef);
            } catch (error) {
                console.log("No previous resume to delete");
            }
        }

        // Upload new resume
        const storageRef = ref(storage, `resumes/${userId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                null,
                (error) => reject(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await setDoc(doc(db, "resumes", userId), {
                        url: downloadURL,
                        studentId: userId,
                        studentName,
                        uploadedAt: new Date(),
                        needsReview: true,
                        fileName: file.name
                    }, { merge: true });
                    resolve(downloadURL);
                }
            );
        });
    } catch (error) {
        console.error("Error uploading resume:", error);
        throw error;
    }
};

/**
 * Gets a user's resume data
 * @param {string} userId - The user's UID
 * @returns {Promise<Object|null>} The resume data or null if not found
 */
export const getResume = async (userId) => {
    const docRef = doc(db, "resumes", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};

/**
 * Gets all resumes that need review
 * @returns {Promise<Array>} Array of resumes needing review
 */
export const getPendingResumes = async () => {
    const q = query(
        collection(db, "resumes"),
        where("needsReview", "==", true),
        orderBy("uploadedAt", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Submits a review for a resume
 * @param {string} resumeId - The student's UID (same as resume document ID)
 * @param {string} reviewerId - The alumni's UID
 * @param {string} reviewerName - The alumni's display name
 * @param {string} feedback - The review feedback
 * @returns {Promise<string>} The ID of the created review
 */
export const submitReview = async (resumeId, reviewerId, reviewerName, feedback) => {
    try {
        // Add the review
        const reviewRef = await addDoc(collection(db, "reviews"), {
            resumeId,
            studentId: resumeId,
            reviewerId,
            reviewerName,
            feedback,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Mark resume as reviewed
        await updateDoc(doc(db, "resumes", resumeId), {
            needsReview: false,
            lastReviewedAt: new Date()
        });

        return reviewRef.id;
    } catch (error) {
        console.error("Error submitting review:", error);
        throw error;
    }
};

/**
 * Gets all reviews for a specific student
 * @param {string} studentId - The student's UID
 * @returns {Promise<Array>} Array of reviews
 */
export const getStudentReviews = async (studentId) => {
    const q = query(
        collection(db, "reviews"),
        where("studentId", "==", studentId),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Real-time listener for resume updates
 * @param {string} userId - The user's UID
 * @param {Function} callback - Callback function when data changes
 * @returns {Function} Unsubscribe function
 */
export const onResumeUpdate = (userId, callback) => {
    return onSnapshot(doc(db, "resumes", userId), (doc) => {
        callback(doc.exists() ? doc.data() : null);
    });
};

/**
 * Real-time listener for review updates
 * @param {string} studentId - The student's UID
 * @param {Function} callback - Callback function when data changes
 * @returns {Function} Unsubscribe function
 */
export const onReviewsUpdate = (studentId, callback) => {
    const q = query(
        collection(db, "reviews"),
        where("studentId", "==", studentId),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
};

// ==================== EXISTING FUNCTIONS ====================

export const addDiscussion = async (title, body, userId, userName) => {
    await addDoc(collection(db, "discussions"), {
        title,
        body,
        upvotes: 0,
        authorId: userId,
        authorName: userName,
        createdAt: new Date(),
        updatedAt: new Date()
    });
};

export const fetchDiscussions = async (filter = 'newest') => {
    let q;
    if (filter === 'hottest') {
        q = query(collection(db, "discussions"), orderBy("upvotes", "desc"));
    } else if (filter === 'newest') {
        q = query(collection(db, "discussions"), orderBy("createdAt", "desc"));
    } else {
        q = query(collection(db, "discussions"));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchMentors = async () => {
    const q = query(
        collection(db, "users"),
        where("role", "==", "alumni"),
        where("mentorshipAvailability", "==", true),
        orderBy("experience", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ==================== USER MANAGEMENT ====================

/**
 * Gets user role (student/alumni)
 * @param {string} userId 
 * @returns {Promise<string|null>} The user's role or null if not found
 */
export const getUserRole = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().role : null;
};

/**
 * Real-time listener for user role changes
 * @param {Function} callback - Callback function when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onUserRoleChange = (callback) => {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            const role = await getUserRole(user.uid);
            callback(role);
        } else {
            callback(null);
        }
    });
};