import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        { icon: '📅', label: 'Schedule Call', path: '/schedule' },
        { icon: '👥', label: 'Find Mentor', path: '/mentorship' },
        { icon: '❓', label: 'Ask Question', path: '/ask' },
        { icon: '📄', label: 'Upload CV', path: '/upload-cv' },
        { icon: '💼', label: 'Book Interview', path: '/interview' },
        { icon: '📚', label: 'Browse Resources', path: '/resources' }
    ];

    return (
        <div className="quick-actions-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions-grid">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className="quick-action-btn"
                        onClick={() => navigate(action.path)}
                    >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-label">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;