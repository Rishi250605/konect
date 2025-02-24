import React, { useState } from 'react';
import './PostCreator.css';

const PostCreator = ({ onSubmit, communityName }) => {
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        attachments: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(postData);
        setIsCreatingPost(false);
        setPostData({ title: '', content: '', attachments: [] });
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setPostData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
    };

    const removeAttachment = (index) => {
        setPostData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="post-creator">
            <div className="post-creator-card" onClick={() => setIsCreatingPost(true)}>
                <div className="post-input-wrapper">
                    <div className="avatar">
                        <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                    <div className="post-input">
                        <input 
                            type="text" 
                            placeholder={`What's on your mind?${communityName ? ` Share it with ${communityName}` : ''}`}
                            readOnly 
                        />
                    </div>
                </div>
                <div className="quick-actions">
                    <button className="quick-action-btn">
                        <i className="fas fa-image"></i>
                        <span>Photo/Video</span>
                    </button>
                    <button className="quick-action-btn">
                        <i className="fas fa-microphone"></i>
                        <span>Voice</span>
                    </button>
                    <button className="quick-action-btn">
                        <i className="fas fa-link"></i>
                        <span>Link</span>
                    </button>
                </div>
            </div>

            {isCreatingPost && (
                <div className="post-creator-modal">
                    <div className="modal-overlay" onClick={() => setIsCreatingPost(false)} />
                    <div className="modal-content">
                        <div className="form-header">
                            <h2>Create a post</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setIsCreatingPost(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="post-form">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Give your post a title"
                                    value={postData.title}
                                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    id="content"
                                    placeholder="Share your thoughts..."
                                    value={postData.content}
                                    onChange={(e) => setPostData({...postData, content: e.target.value})}
                                />
                            </div>

                            <div className="form-group">
                                <label>Add to your post</label>
                                <div className="attachment-buttons">
                                    <label className="attachment-btn" role="button">
                                        <input
                                            type="file"
                                            accept="image/*,video/*"
                                            onChange={handleFileUpload}
                                            multiple
                                            hidden
                                        />
                                        <i className="fas fa-image"></i>
                                        <span>Media</span>
                                    </label>
                                    <label className="attachment-btn" role="button">
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={handleFileUpload}
                                            hidden
                                        />
                                        <i className="fas fa-microphone"></i>
                                        <span>Voice</span>
                                    </label>
                                    <button type="button" className="attachment-btn">
                                        <i className="fas fa-link"></i>
                                        <span>Link</span>
                                    </button>
                                </div>
                            </div>

                            {postData.attachments.length > 0 && (
                                <div className="form-group">
                                    <label>Attachments</label>
                                    <div className="attachments-preview">
                                        {postData.attachments.map((file, index) => (
                                            <div key={index} className="attachment-item">
                                                {file.type.startsWith('image/') ? (
                                                    <img 
                                                        src={URL.createObjectURL(file)} 
                                                        alt="Preview" 
                                                    />
                                                ) : (
                                                    <div className="file-icon">
                                                        <i className={`fas ${file.type.startsWith('video/') ? 'fa-video' : 'fa-microphone'}`}></i>
                                                    </div>
                                                )}
                                                <span className="file-name">{file.name}</span>
                                                <button 
                                                    type="button"
                                                    onClick={() => removeAttachment(index)}
                                                    className="remove-attachment"
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="form-actions">
                                <button type="submit" className="submit-btn">
                                    <i className="fas fa-paper-plane"></i>
                                    Post
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={() => setIsCreatingPost(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCreator; 