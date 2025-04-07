import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Resources = () => {
    const [activeTab, setActiveTab] = useState('courses');

    const resourceData = {
        courses: {
            title: "Popular Videos & Courses",
            items: [
                {
                    title: "Complete Web Development Bootcamp",
                    source: "Udemy",
                    rating: "4.7",
                    link: "#",
                    description: "Learn full-stack development with hands-on projects and build 12+ real-world applications"
                },
                {
                    title: "Machine Learning A-Z",
                    source: "Coursera",
                    rating: "4.8",
                    link: "#",
                    description: "Hands-on Python and R in data science with practical exercises and case studies"
                },
                {
                    title: "Data Science Fundamentals",
                    source: "edX",
                    rating: "4.5",
                    link: "#",
                    description: "Master the basics of data science with Python through this comprehensive course"
                }
            ]
        },
        interview: {
            title: "Interview Questions",
            items: [
                {
                    title: "Top 100 Coding Problems",
                    source: "LeetCode",
                    downloads: "1.2k",
                    link: "#",
                    description: "Curated list of most frequently asked coding interview questions"
                },
                {
                    title: "Behavioral Interview Guide",
                    source: "InterviewBit",
                    downloads: "850",
                    link: "#",
                    description: "Complete preparation guide for behavioral interview rounds"
                },
                {
                    title: "System Design Primer",
                    source: "GitHub",
                    downloads: "2.5k",
                    link: "#",
                    description: "Learn how to design scalable systems with real-world examples"
                }
            ]
        },
        books: {
            title: "Popular Books",
            items: [
                {
                    title: "Clean Code",
                    author: "Robert Martin",
                    year: "2008",
                    link: "#",
                    description: "A handbook of agile software craftsmanship with practical coding guidelines"
                },
                {
                    title: "Designing Data-Intensive Applications",
                    author: "Martin Kleppmann",
                    year: "2017",
                    link: "#",
                    description: "The big ideas behind reliable, scalable, and maintainable systems"
                },
                {
                    title: "The Pragmatic Programmer",
                    author: "Andrew Hunt",
                    year: "1999",
                    link: "#",
                    description: "Your journey to mastery with practical tips and timeless wisdom"
                }
            ]
        },
        projects: {
            title: "Project Ideas",
            items: [
                {
                    title: "E-commerce Platform",
                    level: "Advanced",
                    tech: "MERN Stack",
                    link: "#",
                    description: "Build a complete online store with payment integration and admin dashboard"
                },
                {
                    title: "Chat Application",
                    level: "Intermediate",
                    tech: "WebSockets",
                    link: "#",
                    description: "Real-time messaging app with user authentication and chat rooms"
                },
                {
                    title: "Portfolio Website",
                    level: "Beginner",
                    tech: "HTML/CSS",
                    link: "#",
                    description: "Showcase your work with a responsive personal portfolio site"
                }
            ]
        },
        exams: {
            title: "Competitive Exam Materials",
            items: [
                {
                    title: "GATE CSE Previous Papers",
                    year: "2023",
                    downloads: "3.4k",
                    link: "#",
                    description: "Complete collection of previous year question papers with solutions"
                },
                {
                    title: "GRE Quantitative Practice",
                    source: "ETS",
                    downloads: "1.8k",
                    link: "#",
                    description: "Official practice materials for GRE quantitative section"
                },
                {
                    title: "UPSC CSAT Materials",
                    source: "Vision IAS",
                    downloads: "2.1k",
                    link: "#",
                    description: "Comprehensive study materials for UPSC preliminary examination"
                }
            ]
        },
        certifications: {
            title: "Certification Courses",
            items: [
                {
                    title: "AWS Certified Developer",
                    provider: "Amazon",
                    duration: "3 months",
                    link: "#",
                    description: "Validate technical expertise in developing on AWS"
                },
                {
                    title: "Google Data Analytics",
                    provider: "Google",
                    duration: "6 months",
                    link: "#",
                    description: "Learn data cleaning, analysis, and visualization with real-world scenarios"
                },
                {
                    title: "Microsoft Azure Fundamentals",
                    provider: "Microsoft",
                    duration: "2 months",
                    link: "#",
                    description: "Gain foundational knowledge of cloud services with Azure"
                }
            ]
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="resources-page">
                    {/* <h1 className="resources-title">Resources Library</h1> */}

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
                        <h2 className="category-title">{resourceData[activeTab].title}</h2>
                        <div className="resource-items">
                            {resourceData[activeTab].items.map((item, index) => (
                                <div key={index} className="resource-card">
                                    <div className="card-content">
                                        <h3 className="resource-name">{item.title}</h3>
                                        <div className="resource-details">
                                            {item.source && <div className="detail-row"><span className="detail-label">Source:</span> <span className="detail-value">{item.source}</span></div>}
                                            {item.rating && <div className="detail-row"><span className="detail-label">Rating:</span> <span className="detail-value">⭐ {item.rating}/5</span></div>}
                                            {item.author && <div className="detail-row"><span className="detail-label">Author:</span> <span className="detail-value">{item.author}</span></div>}
                                            {item.year && <div className="detail-row"><span className="detail-label">Year:</span> <span className="detail-value">{item.year}</span></div>}
                                            {item.level && <div className="detail-row"><span className="detail-label">Level:</span> <span className="detail-value">{item.level}</span></div>}
                                            {item.tech && <div className="detail-row"><span className="detail-label">Tech:</span> <span className="detail-value">{item.tech}</span></div>}
                                            {item.downloads && <div className="detail-row"><span className="detail-label">Downloads:</span> <span className="detail-value">{item.downloads}</span></div>}
                                            {item.provider && <div className="detail-row"><span className="detail-label">Provider:</span> <span className="detail-value">{item.provider}</span></div>}
                                            {item.duration && <div className="detail-row"><span className="detail-label">Duration:</span> <span className="detail-value">{item.duration}</span></div>}
                                        </div>
                                        <p className="resource-description">{item.description}</p>
                                    </div>
                                    <div className="card-footer">
                                        <a href={item.link} className="view-btn">View Resources</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;