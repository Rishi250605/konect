import React, { useEffect, useState } from 'react'
import './Dashboard.css'
// import { PostCad } from '../components/PostCard'
import axios from 'axios'
import { Card } from '../components/Card'

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getAllPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/v1/post/all");
        console.log("All posts", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getAllPost(); 
  }, [])

  if (loading) {
    return <div className="dashboard">Loading posts...</div>;
  }

  if (error) {
    return <div className="dashboard">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="post-filters">
        <button className="filter-btn active">Hot</button>
        <button className="filter-btn">New</button>
        <button className="filter-btn">Top</button>
        <button className="filter-btn">Rising</button>
      </div>
      
      <div className="posts">
        {/* <PostCard/> */}
        {posts.map((post, index) => (
          <Card
            key={post._id || index}
            title={post.title}
            body={post.body}
            image={post.image ? `http://localhost:5000/${post.image}` : null}
            user={post.user || {
              username: "Anonymous",
              avatar: null
            }}
            community={post.community || {
              name: "General"
            }}
            tags={post.tags || []}
            createdAt={post.createdAt || new Date()}
            likes={0}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
