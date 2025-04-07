import React from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import StatsCard from '../components/StatsCard';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import RecommendedMentors from '../components/RecommendedMentors';
import '../styles/main.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="dashboard-content">
                    {/* <h1>Dashboard</h1> */}

                    <div className="stats-grid">
                        <StatsCard title="Active Mentors" value="12" subtitle="~2 this month" />
                        <StatsCard title="Messages" value="5" subtitle="3 unread" />
                        <StatsCard title="Upcoming" value="3" subtitle="Sessions scheduled" />
                        <StatsCard title="Resources" value="24" subtitle="New materials" />
                    </div>

                    <div className="content-grid">
                        <div className="left-column">
                            <QuickActions />
                            <RecentActivity />
                        </div>
                        <div className="right-column">
                            <RecommendedMentors />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;