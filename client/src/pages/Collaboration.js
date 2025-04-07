import React from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Collaboration = () => {
    const projects = [
        {
            title: "Environmental Science Research",
            team: "Team Eco",
            members: 5,
            tags: ["Research", "Environment"],
            description: "Study on sustainable urban development and its environmental impacts"
        },
        {
            title: "Mobile App Development",
            team: "Code Warriors",
            members: 3,
            tags: ["Flutter", "Firebase"],
            description: "Building a cross-platform productivity app for students"
        },
        {
            title: "AI for Social Good",
            team: "Tech for Good",
            members: 4,
            tags: ["Machine Learning", "NLP"],
            description: "Developing AI solutions to help non-profit organizations"
        }
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="collaboration-page">
                    {/* <h1>Project Collaboration</h1> */}
                    <p className="page-description">
                        Connect with peers, share knowledge, and work on exciting projects together
                    </p>

                    <div className="action-buttons">
                        <button className="primary-btn">Explore Projects</button>
                        <button className="secondary-btn">Find Collaborators</button>
                    </div>

                    <div className="search-bar">
                        <input type="text" placeholder="Search projects by name or skill..." />
                    </div>

                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <div className="card-header">
                                    <h3>{project.title}</h3>
                                    <span className="members">{project.members} members</span>
                                </div>
                                <p className="team">By: {project.team}</p>
                                <p className="description">{project.description}</p>
                                <div className="tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <button className="join-btn">Join Project</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collaboration;