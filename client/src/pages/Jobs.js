import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        title: '',
        company: '',
        location: ''
    });

    // Fetch jobs from Firebase
    useEffect(() => {
        const fetchJobs = async () => {
            let q = query(collection(db, "jobs"), orderBy("postedAt", "desc"));

            if (filters.title) {
                q = query(q, where("title", ">=", filters.title), where("title", "<=", filters.title + '\uf8ff'));
            }
            if (filters.company) {
                q = query(q, where("company", "==", filters.company));
            }
            if (filters.location) {
                q = query(q, where("location", "==", filters.location));
            }

            const querySnapshot = await getDocs(q);
            const jobsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setJobs(jobsData);
        };

        fetchJobs();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApply = (jobId) => {
        console.log("Applying for job:", jobId);
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="standard-page">
                    <div className="filters">
                        <input
                            type="text"
                            name="title"
                            placeholder="Job title..."
                            className="filter-input"
                            value={filters.title}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="text"
                            name="company"
                            placeholder="Company..."
                            className="filter-input"
                            value={filters.company}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location..."
                            className="filter-input"
                            value={filters.location}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="card-grid">
                        {jobs.map((job) => (
                            <div key={job.id} className="standard-card">
                                <div className="card-header">
                                    <h3>{job.title}</h3>
                                    <span className={`job-type ${job.type.toLowerCase()}`}>{job.type}</span>
                                </div>
                                <div className="card-details">
                                    <p><strong>Company:</strong> {job.company}</p>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Salary:</strong> {job.salary}</p>
                                    {job.deadline && <p><strong>Apply by:</strong> {new Date(job.deadline.toDate()).toLocaleDateString()}</p>}
                                </div>
                                <div className="card-actions">
                                    <button
                                        className="primary-btn"
                                        onClick={() => handleApply(job.id)}
                                    >
                                        Apply
                                    </button>
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