import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Collaboration = () => {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch projects from Firebase
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            let q = query(collection(db, "projects"));

            if (searchQuery) {
                q = query(
                    q,
                    where("keywords", "array-contains", searchQuery.toLowerCase())
                );
            }

            const querySnapshot = await getDocs(q);
            const projectsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(projectsData)
            setProjects(projectsData);
            setLoading(false);
        };

        fetchProjects();
    }, [searchQuery]);

    const handleJoinProject = (projectId) => {
        console.log("Joining project:", projectId);
        // Will implement actual join functionality later
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="collaboration-page">
                    <p className="page-description">
                        Connect with peers, share knowledge, and work on exciting projects together
                    </p>

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search projects by name or skill..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div className="loading-spinner">Loading projects...</div>
                    ) : (
                        <div className="projects-grid">
                            {projects.map((project) => (
                                <div key={project.id} className="project-card">
                                    <div className="card-header">
                                        <h3>{project.title}</h3>
                                        <span className="members">{project.members.length} members</span>
                                    </div>
                                    <p className="team">By: {project.team}</p>
                                    <p className="description">{project.description}</p>
                                    <div className="tags">
                                        {project.tags}
                                    </div>
                                    <button
                                        className="join-btn"
                                        onClick={() => handleJoinProject(project.id)}
                                    >
                                        Join Project
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collaboration;