import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Mentorship = () => {
    const [mentors, setMentors] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        expertise: '',
        company: ''
    });

    useEffect(() => {
        const fetchMentors = async () => {
            
            let q = query(
                collection(db, "users"),
                where("role", "==", "alumni")
            );

            
            if (filters.name) {
                q = query(q, where("name", ">=", filters.name), where("name", "<=", filters.name + '\uf8ff'));
            }
            if (filters.expertise) {
                q = query(q, where("skills", "array-contains", filters.expertise));
            }
            if (filters.company) {
                q = query(q, where("company", "==", filters.company));
            }

            // Order by experience (descending)
            // q = query(q, orderBy("experience"    ));

            const querySnapshot = await getDocs(q);
            const mentorsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMentors(mentorsData);
        };

        fetchMentors();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConnect = (mentorId) => {
        console.log("Connect with mentor:", mentorId);
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
                            name="name"
                            placeholder="Search by name..."
                            className="filter-input"
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="text"
                            name="expertise"
                            placeholder="Search by expertise..."
                            className="filter-input"
                            value={filters.expertise}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="text"
                            name="company"
                            placeholder="Search by company..."
                            className="filter-input"
                            value={filters.company}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="card-grid">
                        {mentors.map((mentor) => (
                            <div key={mentor.id} className="standard-card">
                                <h3>{mentor.name}</h3>
                                <div className="card-details">
                                    {/* <p><strong>Expertise:</strong> {mentor.skills?.join(', ')}</p> */}
                                    <p><strong>Company:</strong> {mentor.company}</p>
                                    <p><strong>Experience:</strong> {mentor.experience} years</p>
                                    <p><strong>Rating:</strong> ⭐ {mentor.rating} ({mentor.sessions} sessions)</p>
                                </div>
                                <div className="card-actions">
                                    <button
                                        className="primary-btn"
                                        onClick={() => handleConnect(mentor.id)}
                                    >
                                        Connect
                                    </button>
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