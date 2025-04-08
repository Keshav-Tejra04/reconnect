import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Resources = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch resources from Firebase
    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            const q = query(
                collection(db, "resources"),
                where("category", "==", activeTab)
            );
            const querySnapshot = await getDocs(q);
            const resourcesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setResources(resourcesData);
            setLoading(false);
        };

        fetchResources();
    }, [activeTab]);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="resources-page">
                    <div className="resource-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                            onClick={() => setActiveTab('courses')}
                        >
                            🎥 Courses
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('interview')}
                        >
                            💼 Interview Qs
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`}
                            onClick={() => setActiveTab('books')}
                        >
                            📚 Books
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            💡 Projects
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'exams' ? 'active' : ''}`}
                            onClick={() => setActiveTab('exams')}
                        >
                            📝 Exams
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('certifications')}
                        >
                            🏆 Certifications
                        </button>
                    </div>

                    <div className="tab-content">
                        <h2 className="category-title">
                            {activeTab === 'courses' && 'Popular Videos & Courses'}
                            {activeTab === 'interview' && 'Interview Questions'}
                            {activeTab === 'books' && 'Popular Books'}
                            {activeTab === 'projects' && 'Project Ideas'}
                            {activeTab === 'exams' && 'Competitive Exam Materials'}
                            {activeTab === 'certifications' && 'Certification Courses'}
                        </h2>

                        {loading ? (
                            <div className="loading-spinner">Loading resources...</div>
                        ) : (
                            <div className="resource-items">
                                {resources.map((item) => (
                                    <div key={item.id} className="resource-card">
                                        <div className="card-content">
                                            <h3 className="resource-name">{item.title}</h3>
                                            <div className="resource-details">
                                                {item.source && <div className="detail-row"><span className="detail-label">Source:</span> <span className="detail-value">{item.source}</span></div>}
                                                {item.rating && <div className="detail-row"><span className="detail-label">Rating:</span> <span className="detail-value">⭐ {item.rating}/5</span></div>}
                                                {item.author && <div className="detail-row"><span className="detail-label">Author:</span> <span className="detail-value">{item.author}</span></div>}
                                                {item.year && <div className="detail-row"><span className="detail-label">Year:</span> <span className="detail-value">{item.year}</span></div>}
                                                {item.level && <div className="detail-row"><span className="detail-label">Level:</span> <span className="detail-value">{item.level}</span></div>}
                                                {item.tech && <div className="detail-row"><span className="detail-label">Tech:</span> <span className="detail-value">{item.tech}</span></div>}
                                                {item.downloads && <div className="detail-row"><span className="detail-label">Downloads:</span> <span className="detail-value">{item.downloads.toLocaleString()}</span></div>}
                                                {item.provider && <div className="detail-row"><span className="detail-label">Provider:</span> <span className="detail-value">{item.provider}</span></div>}
                                                {item.duration && <div className="detail-row"><span className="detail-label">Duration:</span> <span className="detail-value">{item.duration}</span></div>}
                                            </div>
                                            <p className="resource-description">{item.description}</p>
                                        </div>
                                        <div className="card-footer">
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="view-btn">
                                                View Resource
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;