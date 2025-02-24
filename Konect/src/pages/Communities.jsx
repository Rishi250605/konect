import React from 'react';
import { Link } from 'react-router-dom';
import './Communities.css';

const Communities = () => {
    const communities = [
        {
            id: 'frontend',
            name: 'Frontend Development',
            members: 1234,
            description: 'A community for frontend developers to share knowledge, ask questions, and discuss latest trends in web development.',
            icon: '🎨'
        },
        // Add more communities here
    ];

    return (
        <div className="communities-page">
            <div className="communities-header">
                <h1>Communities</h1>
                <button className="create-community-btn">
                    <i className="fas fa-plus"></i> Create Community
                </button>
            </div>

            <div className="communities-grid">
                {communities.map(community => (
                    <Link to={`/community/${community.id}`} key={community.id} className="community-card">
                        <div className="community-icon">{community.icon}</div>
                        <div className="community-info">
                            <h3>{community.name}</h3>
                            <p className="member-count">{community.members.toLocaleString()} members</p>
                            <p className="description">{community.description}</p>
                        </div>
                        <button className="join-btn">Join</button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Communities; 