import React from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Jobs = () => {
    const jobs = [
        {
            title: "Web Developer Intern",
            company: "Unified Mentor Private Limited",
            location: "India (Remote)",
            type: "Internship",
            salary: "$2,000 - $3,000/month"
        },
        {
            title: "Frontend Developer",
            company: "Meta Softer Technologies",
            location: "India (Remote)",
            type: "Full-time",
            salary: "$45,000 - $60,000"
        },
        {
            title: "Python Developer",
            company: "TechGlobal Inc.",
            location: "Delhi, India",
            type: "Full-time",
            salary: "$50,000 - $75,000"
        },
        {
            title: "Software Engineer",
            company: "Alumni Startup XYZ",
            location: "Bangkok, India",
            type: "Full-time",
            salary: "€50,000 - €70,000"
        },
        {
            title: "Data Science Intern",
            company: "Data Insights Co.",
            location: "Remote",
            type: "Internship",
            salary: "$3,000/month"
        },
        {
            title: "Product Manager",
            company: "Tech Solutions Inc.",
            location: "Bangalore, India",
            type: "Full-time",
            salary: "₹15,00,000 - ₹20,00,000"
        }
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="standard-page">
                    <div className="filters">
                        <input type="text" placeholder="Job title..." className="filter-input" />
                        <input type="text" placeholder="Company..." className="filter-input" />
                        <input type="text" placeholder="Location..." className="filter-input" />
                    </div>

                    <div className="card-grid">
                        {jobs.map((job, index) => (
                            <div key={index} className="standard-card">
                                <div className="card-header">
                                    <h3>{job.title}</h3>
                                    <span className={`job-type ${job.type.toLowerCase()}`}>{job.type}</span>
                                </div>
                                <div className="card-details">
                                    <p><strong>Company:</strong> {job.company}</p>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Salary:</strong> {job.salary}</p>
                                </div>
                                <div className="card-actions">
                                    <button className="primary-btn">Apply</button>
                                    <button className="secondary-btn">Save</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;