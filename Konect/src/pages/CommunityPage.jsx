import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCreator from "../components/PostCreator";
import "./CommunityPage.css";
import axios from "axios";

const CommunityPage = () => {
    const { id } = useParams();
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [communityInfo, setCommunityInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [posts , setPosts] = useState({});

    const getCommunityDetails = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/v1/community/${id}`);
            console.log("Fetched community data:", response.data);
            setCommunityInfo(response.data);
        } catch (err) {
            console.error("Error fetching community details:", err);
            setError("Failed to load community details.");
        } finally {
            setLoading(false);
        }
    };

    const getPost = async () =>{
        const response = await axios.get(`http://localhost:5000/api/v1/post/community/${communityInfo._id}`);
        console.log(response.data);
        setPosts(response.data);
    }
    useEffect(() => {
        getCommunityDetails(id);
        getPost();
    }, [id]);

    const handlePostSubmit = (postData) => {
        console.log("New post:", postData);
        setIsCreatingPost(false);
    };
    
    if (loading) return <div className="loading">Loading community details...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="community-page">
            {communityInfo && (
                <div className="community-banner" style={{ backgroundImage: `url(${communityInfo?.banner || ""})` }}>
                    <div className="banner-overlay" />
                    <div className="community-info">
                        <h1>{communityInfo?.name || "Community Name"}</h1>
                        <p className="description">{communityInfo?.description || "No description available"}</p>
                        <div className="community-tags">
                            {communityInfo?.tags?.length ? (
                                communityInfo.tags.map((tag) => <span key={tag} className="tag" >{tag}</span>)
                            ) : (
                                <p>No tags available</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* <div className="community-content">
                <div className="posts-list"> */}
                    {/* Dummy Posts */}
                    {/* {posts && posts.map((post) => (
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
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="tag" onClick={()=>{

                                        }}>{tag}</span>
                                    ))}
                                </div>
                                <div className="post-meta">
                                    <span>Posted by u/{post.author}</span>
                                    <span>{post.timeAgo}</span>
                                    <button><i className="fas fa-comment"></i> {post.comments} Comments</button>
                                    <button><i className="fas fa-share"></i> Share</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* <button className="create-post-fab" onClick={() => setIsCreatingPost(true)} title="Create Post">
                <i className="fas fa-plus"></i>
            </button> */}

            <PostCreator 
                onSubmit={handlePostSubmit}
                communityName={communityInfo?.name || ""}
                isOpen={isCreatingPost}
                onClose={() => setIsCreatingPost(false)}
            />
        </div>
    );
};

export default CommunityPage;
