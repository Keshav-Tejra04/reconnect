import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Settings = () => {
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        emailUpdates: true,
        privacy: 'public'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="settings-page">
                    <h1>Account Settings</h1>

                    <div className="settings-card">
                        <div className="settings-section">
                            <h2>Notification Preferences</h2>

                            <div className="setting-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="notifications"
                                        checked={settings.notifications}
                                        onChange={handleChange}
                                    />
                                    Enable Notifications
                                </label>
                            </div>

                            <div className="setting-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="emailUpdates"
                                        checked={settings.emailUpdates}
                                        onChange={handleChange}
                                    />
                                    Email Updates
                                </label>
                            </div>
                        </div>

                        <div className="settings-section">
                            <h2>Display Preferences</h2>

                            <div className="setting-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="darkMode"
                                        checked={settings.darkMode}
                                        onChange={handleChange}
                                    />
                                    Dark Mode
                                </label>
                            </div>
                        </div>

                        <div className="settings-section">
                            <h2>Privacy Settings</h2>

                            <div className="setting-item">
                                <label>Profile Visibility</label>
                                <select
                                    name="privacy"
                                    value={settings.privacy}
                                    onChange={handleChange}
                                >
                                    <option value="public">Public</option>
                                    <option value="connections">Only Connections</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>

                        <div className="settings-actions">
                            <button className="save-btn">Save Changes</button>
                            <button className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;