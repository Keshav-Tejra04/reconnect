import React from 'react';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import RecommendedMentors from './RecommendedMentors';

const DashboardContent = () => {
    return (
        <div>
            <h1>Dashboard</h1>

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
    );
};

export default DashboardContent;