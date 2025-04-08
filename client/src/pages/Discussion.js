import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, where } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { increment } from 'firebase/firestore';


const Discussion = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const [discussions, setDiscussions] = useState([]);
    const [userVotes, setUserVotes] = useState({});
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        tags: '',
        category: 'general'
    });

    // Fetch discussions from Firebase
    useEffect(() => {
        const fetchDiscussions = async () => {
            let q;
            if (activeTab === 'hot') {
                q = query(collection(db, "discussions"), orderBy("upvotes", "desc"));
            } else if (activeTab === 'new') {
                q = query(collection(db, "discussions"), orderBy("timestamp", "desc"));
            } else if (activeTab === 'top') {
                q = query(collection(db, "discussions"), orderBy("upvotes", "desc"));
            } else {
                q = query(collection(db, "discussions"), where("category", "==", activeTab));
            }

            const querySnapshot = await getDocs(q);
            const discussionsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDiscussions(discussionsData);
        };

        fetchDiscussions();
    }, [activeTab]);

    const handleVote = async (discussionId, voteType) => {
        const discussionRef = doc(db, "discussions", discussionId);
        const currentVote = userVotes[discussionId];
        let voteChange = 0;

        if (currentVote === voteType) {
            voteChange = voteType === 'up' ? -1 : 1;
            setUserVotes(prev => {
                const newVotes = { ...prev };
                delete newVotes[discussionId];
                return newVotes;
            });
        } else if (currentVote) {
            voteChange = voteType === 'up' ? 2 : -2;
            setUserVotes(prev => ({ ...prev, [discussionId]: voteType }));
        } else {
            voteChange = voteType === 'up' ? 1 : -1;
            setUserVotes(prev => ({ ...prev, [discussionId]: voteType }));
        }

        await updateDoc(discussionRef, {
            upvotes: increment(voteChange)
        });
    };

    const handleCreatePost = async () => {
        try {
            await addDoc(collection(db, "discussions"), {
                title: newPost.title,
                content: newPost.content,
                author: "CurrentUser", // Replace with actual user later
                upvotes: 0,
                comments: 0,
                timestamp: new Date(),
                tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                category: newPost.category
            });

            setShowNewPostModal(false);
            setNewPost({ title: '', content: '', tags: '', category: 'general' });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
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
                        {discussions
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
                                            <span>{new Date(discussion.timestamp?.toDate()).toLocaleString()}</span>
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