import React, { useState } from 'react';
import './PostCreator.css';

const PostCreator = ({ onSubmit, communityName, isOpen, onClose }) => {
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        attachments: [],
        link: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(postData);
        setPostData({ title: '', content: '', attachments: [], link: '' });
        onClose();
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

    if (!isOpen) return null;

    return (
        <div className="post-creator-modal">
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content">
                <div className="form-header">
                    <h2>Create a post</h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="post-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={postData.title}
                        onChange={(e) => setPostData({...postData, title: e.target.value})}
                        required
                        className="title-input"
                    />
                    <textarea
                        placeholder="What's on your mind?"
                        value={postData.content}
                        onChange={(e) => setPostData({...postData, content: e.target.value})}
                        className="content-input"
                    />
                    <div className="attachment-options">
                        <label className="attachment-btn">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                hidden
                            />
                            <i className="fas fa-image"></i>
                            Photo
                        </label>
                        <label className="attachment-btn">
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileUpload}
                                hidden
                            />
                            <i className="fas fa-video"></i>
                            Video
                        </label>
                        <button 
                            type="button" 
                            className="attachment-btn"
                            onClick={() => {
                                const link = prompt('Enter URL:');
                                if (link) setPostData({...postData, link});
                            }}
                        >
                            <i className="fas fa-link"></i>
                            Link
                        </button>
                    </div>

                    {postData.attachments.length > 0 && (
                        <div className="attachments-preview">
                            {postData.attachments.map((file, index) => (
                                <div key={index} className="attachment-item">
                                    {file.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(file)} alt="Preview" />
                                    ) : (
                                        <i className="fas fa-video"></i>
                                    )}
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
                    )}

                    {postData.link && (
                        <div className="link-preview">
                            <span>{postData.link}</span>
                            <button 
                                type="button" 
                                onClick={() => setPostData({...postData, link: ''})}
                                className="remove-link"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            Post <i className="fas fa-paper-plane"></i>
                        </button>
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostCreator; 