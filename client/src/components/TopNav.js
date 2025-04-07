import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TopNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const showSearch = ['/', '/resources'].includes(location.pathname);

    return (
        <div className="top-nav-bar">
            <div className="page-title">
                {{
                    '/': 'Dashboard',
                    '/mentorship': 'Find Mentors',
                    '/collaboration': 'Project Collaboration',
                    '/jobs': 'Job Portal',
                    '/resources': 'Resources Library',
                    '/profile': 'My Profile'
                }[location.pathname] || ''}
            </div>

            <div className="nav-right">
                {showSearch && (
                    <div className="search-box">
                        <input type="text" placeholder="Search..." />
                        <span className="search-icon">🔍</span>
                    </div>
                )}

                <div className="profile-container" ref={dropdownRef}>
                    <button
                        className="profile-button"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        👤
                    </button>

                    {showDropdown && (
                        <div className="profile-dropdown">
                
                            <button onClick={() => navigate('/profile')}>
                                <span>👤</span> Profile
                            </button>
                            <button onClick={() => navigate('/settings')}>
                                <span>⚙️</span> Settings
                            </button>
                            <button onClick={() => navigate('/logout')}>
                                <span>🚪</span> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNav;