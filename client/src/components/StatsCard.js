import React from 'react';

const StatsCard = ({ title, value, subtitle }) => {
    return (
        <div className="stats-card">
            <h3>{title}</h3>
            <div className="stats-value">{value}</div>
            <div className="stats-subtitle">{subtitle}</div>
        </div>
    );
};

export default StatsCard;