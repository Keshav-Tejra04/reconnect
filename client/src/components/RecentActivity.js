import React from 'react';

const RecentActivity = () => {
    return (
        <div className="card">
            <h2>Recent Activity</h2>
            <div className="activity-list">
                <div className="activity-item">
                    <strong>New message from Payal Samanta</strong>
                    <p>"Hi Shanya, I've reviewed your resume and have some suggestions..."</p>
                </div>
                <div className="activity-item">
                    <p>Upcoming session with <strong>Pankaj Wadhwani</strong></p>
                </div>
                <div className="activity-item">
                    <p>Mock interview scheduled for tomorrow at 3:00 PM</p>
                </div>
                <div className="activity-item">
                    <p>New resource available</p>
                    <p>"Tech Interview Preparation Guide" uploaded by Vinmy Katayal</p>
                </div>
                <div className="activity-item">
                    <p>Your question got 3 new answers</p>
                    <p>"What skills are most valued in Data Science roles?"</p>
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;