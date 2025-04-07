import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const Discussion = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample discussion data with state for votes
    const [discussions, setDiscussions] = useState({
        general: [
            {
                id: 1,
                title: "Welcome to our Discussion Forum!",
                author: "Admin",
                upvotes: 125,
                comments: 42,
                timestamp: "1 day ago",
                tags: ["#Welcome", "#Guidelines"]
            }
        ],
        hot: [
            {
                id: 2,
                title: "What skills are most valuable for Data Science roles?",
                author: "DataEnthusiast",
                upvotes: 142,
                comments: 38,
                timestamp: "2 hours ago",
                tags: ["#DataScience", "#CareerAdvice"]
            }
        ],
        new: [
            {
                id: 3,
                title: "Just landed my first internship at Google! AMA",
                author: "NewGrad2023",
                upvotes: 87,
                comments: 24,
                timestamp: "15 minutes ago",
                tags: ["#Internship", "#Google"]
            }
        ],
        top: [
            {
                id: 4,
                title: "Complete roadmap to become a Full Stack Developer",
                author: "TechGuide",
                upvotes: 356,
                comments: 92,
                timestamp: "1 week ago",
                tags: ["#WebDevelopment", "#Roadmap"]
            }
        ]
    });

    const [userVotes, setUserVotes] = useState({});
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        tags: '',
        category: 'general'
    });

    const handleVote = (discussionId, voteType) => {
        setDiscussions(prevDiscussions => {
            const updatedDiscussions = { ...prevDiscussions };

            // Find which category contains this discussion
            const category = Object.keys(updatedDiscussions).find(key =>
                updatedDiscussions[key].some(d => d.id === discussionId)
            );

            if (category) {
                const discussionIndex = updatedDiscussions[category].findIndex(d => d.id === discussionId);
                const currentVote = userVotes[discussionId];

                // Calculate vote change
                let voteChange = 0;
                if (currentVote === voteType) {
                    // Clicking same vote again removes it
                    voteChange = voteType === 'up' ? -1 : 1;
                    setUserVotes(prev => {
                        const newVotes = { ...prev };
                        delete newVotes[discussionId];
                        return newVotes;
                    });
                } else if (currentVote) {
                    // Changing vote (e.g., from up to down)
                    voteChange = voteType === 'up' ? 2 : -2;
                    setUserVotes(prev => ({ ...prev, [discussionId]: voteType }));
                } else {
                    // New vote
                    voteChange = voteType === 'up' ? 1 : -1;
                    setUserVotes(prev => ({ ...prev, [discussionId]: voteType }));
                }

                // Update the upvotes count
                updatedDiscussions[category][discussionIndex].upvotes += voteChange;
            }

            return updatedDiscussions;
        });
    };

    const handleCreatePost = () => {
        const newId = Math.max(...Object.values(discussions).flat().map(d => d.id)) + 1;

        setDiscussions(prev => {
            const updated = { ...prev };
            updated[newPost.category] = [
                {
                    id: newId,
                    title: newPost.title,
                    author: "CurrentUser", // Replace with actual user later
                    upvotes: 0,
                    comments: 0,
                    timestamp: "Just now",
                    tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                },
                ...updated[newPost.category]
            ];
            return updated;
        });

        setShowNewPostModal(false);
        setNewPost({ title: '', content: '', tags: '', category: 'general' });
    };

    const handleDiscussionTitleClick = (id) => {
        console.log("Discussion title clicked:", id);
        // Will implement actual navigation later
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <div className="discussion-page">
                    <div className="search-sort-container">
                        <div className="search-bar-container">
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Search discussions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="search-icon-container">
                                    <span className="search-icon">🔍</span>
                                </div>
                            </div>
                        </div>

                        <div className="sort-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                                onClick={() => setActiveTab('general')}
                            >
                                🌐 General
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'hot' ? 'active' : ''}`}
                                onClick={() => setActiveTab('hot')}
                            >
                                🔥 Hottest
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
                                onClick={() => setActiveTab('new')}
                            >
                                🆕 Newest
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'top' ? 'active' : ''}`}
                                onClick={() => setActiveTab('top')}
                            >
                                🏆 Top
                            </button>
                        </div>
                    </div>

                    <button
                        className="create-post-btn"
                        onClick={() => setShowNewPostModal(true)}
                    >
                        + Create New Discussion
                    </button>

                    <div className="discussions-list">
                        {discussions[activeTab]
                            .filter(discussion =>
                                discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                (discussion.tags && discussion.tags.some(tag =>
                                    tag.toLowerCase().includes(searchQuery.toLowerCase())))
                            )
                            .map(discussion => (
                                <div key={discussion.id} className="discussion-card">
                                    <div className="discussion-content">
                                        <h3
                                            className="clickable-title"
                                            onClick={() => handleDiscussionTitleClick(discussion.id)}
                                        >
                                            {discussion.title}
                                        </h3>
                                        <div className="meta">
                                            <span>Posted by u/{discussion.author}</span>
                                            <span>{discussion.timestamp}</span>
                                            <span>{discussion.comments} comments</span>
                                        </div>
                                        {discussion.tags && (
                                            <div className="tags">
                                                {discussion.tags.map((tag, index) => (
                                                    <span key={index} className="tag">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="action-buttons">
                                        <div className="vote-buttons">
                                            <button
                                                className={`like-btn ${userVotes[discussion.id] === 'up' ? 'active' : ''}`}
                                                onClick={() => handleVote(discussion.id, 'up')}
                                            >
                                                👍 {discussion.upvotes}
                                            </button>
                                            <button
                                                className={`dislike-btn ${userVotes[discussion.id] === 'down' ? 'active' : ''}`}
                                                onClick={() => handleVote(discussion.id, 'down')}
                                            >
                                                👎
                                            </button>
                                        </div>
                                        <div className="other-actions">
                                            <button
                                                className="report-btn"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {showNewPostModal && (
                        <div className="modal-overlay">
                            <div className="new-post-modal">
                                <h2>Create New Discussion</h2>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        placeholder="What's your discussion about?"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        placeholder="Write your thoughts here..."
                                        rows="5"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={newPost.tags}
                                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                        placeholder="e.g., CareerAdvice, Internship, Resume"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={newPost.category}
                                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                    >
                                        <option value="general">General</option>
                                        <option value="hot">Hottest</option>
                                        <option value="new">Newest</option>
                                        <option value="top">Top</option>
                                    </select>
                                </div>
                                <div className="modal-actions">
                                    <button
                                        className="cancel-btn"
                                        onClick={() => setShowNewPostModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="submit-btn"
                                        onClick={handleCreatePost}
                                        disabled={!newPost.title.trim()}
                                    >
                                        Post Discussion
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discussion;