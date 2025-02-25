import React, { useState } from 'react';
import './Card.css';
import { formatDistanceToNow } from 'date-fns';

const Card = ({ 
  _id,
  title,
  body,
  image,
  user,
  community,
  tags,
  createdAt,
  likes = 0
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div 
      className="community-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">
        <div className="user-info">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.username} className="user-avatar" />
          ) : (
            <div className="user-avatar-placeholder">
              {user?.username?.charAt(0) || '?'}
            </div>
          )}
          <div>
            <span className="username">{user?.username}</span>
            <div className="community-label">
              <span className="community-name">{community?.name}</span>
              <span className="post-time">{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="card-title">{title}</h2>
      
      <p className="card-description">{body}</p>
      
      {image && (
        <div className="post-image-container">
          <img 
            src={image} 
            alt={title} 
            className={`post-image ${isHovered ? 'hovered' : ''}`}
          />
        </div>
      )}
      
      {tags && tags.length > 0 && (
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      )}
      
      <div className="card-actions">
        <button 
          className={`action-button like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
          <span>{likeCount}</span>
        </button>
        <button className="action-button">
          <i className="far fa-comment"></i>
          <span>Comment</span>
        </button>
        <button className="action-button">
          <i className="fas fa-share"></i>
          <span>Share</span>
        </button>
        <button className="action-button bookmark-button">
          <i className="far fa-bookmark"></i>
        </button>
      </div>
    </div>
  );
};

export { Card };