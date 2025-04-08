import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import {
    FaComments,
    FaHandsHelping,
    FaBriefcase,
    FaUsers,
    FaBook,
    FaFileAlt,
    FaBell,
    FaCalendarAlt,
    FaChartLine
} from 'react-icons/fa';
import '../styles/main.css';

const Dashboard = () => {
    // Sample data - replace with your actual data
    const quickActions = [
        {
            title: "Start Discussion",
            icon: <FaComments />,
            link: "/discussion",
            color: "#4CAF50"
        },
        {
            title: "Find Mentor",
            icon: <FaHandsHelping />,
            link: "/mentorship",
            color: "#2196F3"
        },
        {
            title: "Job Board",
            icon: <FaBriefcase />,
            link: "/jobs",
            color: "#FF9800"
        },
        {
            title: "Resume Review",
            icon: <FaFileAlt />,
            link: "/resume-review",
            color: "#9C27B0"
        },
        {
            title: "Collaborate",
            icon: <FaUsers />,
            link: "/collaboration",
            color: "#E91E63"
        },
        {
            title: "Resources",
            icon: <FaBook />,
            link: "/resources",
            color: "#00BCD4"
        }
    ];

    const recentActivities = [
        { id: 1, text: "New message from mentor", time: "10 min ago", icon: <FaBell /> },
        { id: 2, text: "Upcoming session tomorrow", time: "1 hour ago", icon: <FaCalendarAlt /> },
        { id: 3, text: "3 new resources available", time: "3 hours ago", icon: <FaBook /> }
    ];

    const recommendedMentors = [
        { id: 1, name: "Dr. Sarah Johnson", expertise: "Machine Learning", availability: "High" },
        { id: 2, name: "Mark Williams", expertise: "Web Development", availability: "Medium" },
        { id: 3, name: "Lisa Chen", expertise: "Data Science", availability: "High" }
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="dashboard-content">
                    <div className="dashboard-header">
                        <h1>Welcome Back!</h1>
                        <p>Here's what's happening in your network</p>
                    </div>

                    {/* Quick Stats Section */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: '#4CAF50' }}>
                                <FaHandsHelping />
                            </div>
                            <div className="stat-info">
                                <h3>12</h3>
                                <p>Active Mentors</p>
                                <span>~2 this month</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: '#2196F3' }}>
                                <FaComments />
                            </div>
                            <div className="stat-info">
                                <h3>5</h3>
                                <p>Messages</p>
                                <span>3 unread</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: '#FF9800' }}>
                                <FaCalendarAlt />
                            </div>
                            <div className="stat-info">
                                <h3>3</h3>
                                <p>Upcoming</p>
                                <span>Sessions scheduled</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: '#9C27B0' }}>
                                <FaBook />
                            </div>
                            <div className="stat-info">
                                <h3>24</h3>
                                <p>Resources</p>
                                <span>New materials</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="content-grid">
                        {/* Quick Actions Section */}
                        <div className="dashboard-section quick-actions">
                            <h2>Quick Actions</h2>
                            <div className="actions-grid">
                                {quickActions.map((action, index) => (
                                    <Link to={action.link} key={index} className="action-card" style={{ borderTop: `4px solid ${action.color}` }}>
                                        <div className="action-icon" style={{ color: action.color }}>
                                            {action.icon}
                                        </div>
                                        <h3>{action.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        

                        {/* Recommended Mentors Section */}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;