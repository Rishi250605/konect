import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CommunityPage.css';

const CommunityPage = () => {
    const { id } = useParams();
    const [isCreatingThread, setIsCreatingThread] = useState(false);
    const [newThread, setNewThread] = useState({ title: '', content: '' });

    const threads = [
        {
            id: 1,
            title: 'Best practices for React hooks',
            content: 'What are your favorite React hooks patterns?',
            author: 'reactdev',
            upvotes: 42,
            comments: 12,
            timeAgo: '2 hours ago'
        },
        // Add more threads here
    ];

    const handleCreateThread = (e) => {
        e.preventDefault();
        console.log('New thread:', newThread);
        setIsCreatingThread(false);
        setNewThread({ title: '', content: '' });
    };

    return (
        <div className="community-page">
            <div className="community-banner">
                <div className="community-info">
                    <h1>Frontend Development</h1>
                    <p>A community for frontend developers</p>
                </div>
                <button 
                    className="create-thread-btn"
                    onClick={() => setIsCreatingThread(true)}
                >
                    <i className="fas fa-plus"></i> Create Thread
                </button>
            </div>

            {isCreatingThread && (
                <div className="create-thread-form">
                    <form onSubmit={handleCreateThread}>
                        <input
                            type="text"
                            placeholder="Thread title"
                            value={newThread.title}
                            onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                            required
                        />
                        <textarea
                            placeholder="Thread content"
                            value={newThread.content}
                            onChange={(e) => setNewThread({...newThread, content: e.target.value})}
                            required
                        />
                        <div className="form-actions">
                            <button type="submit">Create Thread</button>
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={() => setIsCreatingThread(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="threads-list">
                {threads.map(thread => (
                    <div key={thread.id} className="thread-card">
                        <div className="vote-buttons">
                            <button><i className="fas fa-arrow-up"></i></button>
                            <span>{thread.upvotes}</span>
                            <button><i className="fas fa-arrow-down"></i></button>
                        </div>
                        <div className="thread-content">
                            <h3>{thread.title}</h3>
                            <p>{thread.content}</p>
                            <div className="thread-meta">
                                <span>Posted by u/{thread.author}</span>
                                <span>{thread.timeAgo}</span>
                                <button>
                                    <i className="fas fa-comment"></i>
                                    {thread.comments} Comments
                                </button>
                                <button>
                                    <i className="fas fa-share"></i>
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityPage; 