import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { icon: '📊', label: 'Dashboard', path: '/' },
        { icon: '👥', label: 'Find Mentors', path: '/mentorship' },
        { icon: '💬', label: 'Discussion Forum', path: '/discussion' }, // New item
        { icon: '👨‍💻', label: 'Project Collaboration', path: '/collaboration' },
        { icon: '💼', label: 'Job Portal', path: '/jobs' },
        { icon: '📚', label: 'Resources Library', path: '/resources' },
        { icon: '📝', label: 'Review', path: '/review' }
    ];

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {!collapsed && <div className="logo">reConnect</div>}
                <button
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? '→' : '←'}
                </button>
            </div>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path}>
                                <span className="menu-icon">{item.icon}</span>
                                {!collapsed && <span className="menu-label">{item.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;