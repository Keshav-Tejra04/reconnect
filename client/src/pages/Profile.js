import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        university: "",
        graduationYear: "",
        major: "",
        skills: [],
        bio: "",
        role: "student"
    });

    // Hardcoded user ID for demo (replace with your actual user ID)
    const userId = "demo_user_id";

    // Fetch user data from Firebase
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFormData(docSnap.data());
            }
        };
        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...formData.skills];
        newSkills[index] = value;
        setFormData(prev => ({ ...prev, skills: newSkills }));
    };

    const addSkill = () => {
        setFormData(prev => ({ ...prev, skills: [...prev.skills, ""] }));
    };

    const removeSkill = (index) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
    };

    const saveProfile = async () => {
        try {
            await updateDoc(doc(db, "users", userId), formData);
            setEditMode(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile: ", error);
            alert("Error updating profile. Please try again.");
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="profile-page">
                    <div className="profile-header">
                        <h1>My Profile</h1>
                        <button
                            className={`edit-btn ${editMode ? 'save-btn' : ''}`}
                            onClick={editMode ? saveProfile : () => setEditMode(true)}
                        >
                            {editMode ? 'Save Profile' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="profile-card">
                        <div className="profile-section">
                            <h2>Basic Information</h2>
                            <div className="form-group">
                                <label>Full Name</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.name}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.email}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                {editMode ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.phone || "Not provided"}</p>
                                )}
                            </div>
                        </div>

                        <div className="profile-section">
                            <h2>Education</h2>
                            <div className="form-group">
                                <label>University</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="university"
                                        value={formData.university}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.university || "Not provided"}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Major</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="major"
                                        value={formData.major}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.major || "Not provided"}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Graduation Year</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.graduationYear || "Not provided"}</p>
                                )}
                            </div>
                        </div>

                        <div className="profile-section">
                            <h2>Skills</h2>
                            {editMode ? (
                                <div className="skills-edit">
                                    {formData.skills.map((skill, index) => (
                                        <div key={index} className="skill-input">
                                            <input
                                                type="text"
                                                value={skill}
                                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                            />
                                            <button
                                                className="remove-skill"
                                                onClick={() => removeSkill(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button className="add-skill" onClick={addSkill}>
                                        + Add Skill
                                    </button>
                                </div>
                            ) : (
                                <div className="skills-display">
                                    {formData.skills.length > 0 ? (
                                        formData.skills.map((skill, index) => (
                                            <span key={index} className="skill-tag">{skill}</span>
                                        ))
                                    ) : (
                                        <p>No skills added yet</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="profile-section">
                            <h2>Bio</h2>
                            {editMode ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            ) : (
                                <p className="bio-text">{formData.bio || "No bio provided"}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;