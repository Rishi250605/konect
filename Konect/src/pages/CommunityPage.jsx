import React from 'react';
import { useParams } from 'react-router-dom';
import PostCreator from '../components/PostCreator';
import './CommunityPage.css';

const CommunityPage = () => {
    const { id } = useParams();

    const handlePostSubmit = (postData) => {
        console.log('New post:', postData);
        // Handle post creation
    };

    return (
        <div className="community-page">
            <div className="community-banner">
                <div className="community-info">
                    <h1>Frontend Development</h1>
                    <p>A community for frontend developers</p>
                </div>
            </div>

            <div className="community-content">
                <PostCreator 
                    onSubmit={handlePostSubmit}
                    communityName="Frontend Development"
                />

                {/* Rest of your community page content */}
            </div>
        </div>
    );
};

export default CommunityPage; 