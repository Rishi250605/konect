import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCreator from '../components/PostCreator';
import './CommunityPage.css';

const CommunityPage = () => {
    const { id } = useParams();
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    const communityInfo = {
        name: 'Frontend Development',
        description: 'A community for frontend developers to share knowledge, ask questions, and discuss the latest trends in web development.',
        members: 12543,
        online: 342,
        createdAt: '2023',
        tags: ['React', 'JavaScript', 'CSS', 'Web Development', 'UI/UX'],
        banner: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
    };

    const posts = [
        {
            id: 1,
            title: 'Best practices for React hooks in 2024',
            content: 'What are your favorite React hooks patterns and best practices?',
            author: 'reactdev',
            upvotes: 42,
            comments: 12,
            timeAgo: '2 hours ago',
            tags: ['React', 'JavaScript']
        },
        // Add more posts here
    ];

    const handlePostSubmit = (postData) => {
        console.log('New post:', postData);
        setIsCreatingPost(false);
    };

    return (
        <div className="community-page">
            <div className="community-banner" style={{ backgroundImage: `url(${communityInfo.banner})` }}>
                <div className="banner-overlay" />
                <div className="community-info">
                    <h1>{communityInfo.name}</h1>
                    <p className="description">{communityInfo.description}</p>
                    <div className="community-stats">
                        <div className="stat">
                            <span className="stat-value">{communityInfo.members.toLocaleString()}</span>
                            <span className="stat-label">Members</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{communityInfo.online.toLocaleString()}</span>
                            <span className="stat-label">Online</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">Created {communityInfo.createdAt}</span>
                        </div>
                    </div>
                    <div className="community-tags">
                        {communityInfo.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="community-content">
                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className="post-card">
                            <div className="vote-buttons">
                                <button><i className="fas fa-arrow-up"></i></button>
                                <span>{post.upvotes}</span>
                                <button><i className="fas fa-arrow-down"></i></button>
                            </div>
                            <div className="post-content">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <div className="post-tags">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="post-meta">
                                    <span>Posted by u/{post.author}</span>
                                    <span>{post.timeAgo}</span>
                                    <button>
                                        <i className="fas fa-comment"></i>
                                        {post.comments} Comments
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

            <button 
                className="create-post-fab"
                onClick={() => setIsCreatingPost(true)}
                title="Create Post"
            >
                <i className="fas fa-plus"></i>
            </button>

            <PostCreator 
                onSubmit={handlePostSubmit}
                communityName={communityInfo.name}
                isOpen={isCreatingPost}
                onClose={() => setIsCreatingPost(false)}
            />
        </div>
    );
};

export default CommunityPage; 