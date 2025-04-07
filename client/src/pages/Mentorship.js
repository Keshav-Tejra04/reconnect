import React from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Mentorship = () => {
    const mentors = [
        {
            name: "Fram Sharma",
            expertise: "Machine Learning",
            company: "Google",
            experience: "5+ years",
            rating: "4.9",
            sessions: "42"
        },
        {
            name: "harsh jain",
            expertise: "Web Development",
            company: "Microsoft",
            experience: "3 years",
            rating: "4.7",
            sessions: "28"
        },
        {
            name: "radhe gupta",
            expertise: "Data Science",
            company: "Amazon",
            experience: "4 years",
            rating: "4.8",
            sessions: "35"
        },
        {
            name: "keshav vangdu",
            expertise: "Cybersecurity",
            company: "IBM",
            experience: "6+ years",
            rating: "4.9",
            sessions: "51"
        },
        {
            name: "vikas dhakad",
            expertise: "AI Research",
            company: "Tesla",
            experience: "7+ years",
            rating: "5.0",
            sessions: "63"
        },
        {
            name: "rashmika mandana",
            expertise: "Cloud Computing",
            company: "Google",
            experience: "4 years",
            rating: "4.7",
            sessions: "29"
        }
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="standard-page">
                    <div className="filters">
                        <input type="text" placeholder="Search by name..." className="filter-input" />
                        <input type="text" placeholder="Search by expertise..." className="filter-input" />
                        <input type="text" placeholder="Search by company..." className="filter-input" />
                    </div>

                    <div className="card-grid">
                        {mentors.map((mentor, index) => (
                            <div key={index} className="standard-card">
                                <h3>{mentor.name}</h3>
                                <div className="card-details">
                                    <p><strong>Expertise:</strong> {mentor.expertise}</p>
                                    <p><strong>Company:</strong> {mentor.company}</p>
                                    <p><strong>Experience:</strong> {mentor.experience}</p>
                                    <p><strong>Rating:</strong> ⭐ {mentor.rating} ({mentor.sessions} sessions)</p>
                                </div>
                                <div className="card-actions">
                                    <button className="primary-btn">Connect</button>
                                    <button className="secondary-btn">Message</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentorship;