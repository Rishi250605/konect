import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="post-filters">
        <button className="filter-btn active">Hot</button>
        <button className="filter-btn">New</button>
        <button className="filter-btn">Top</button>
        <button className="filter-btn">Rising</button>
      </div>
      
      <div className="posts">
        {[1, 2, 3, 4, 5].map((post) => (
          <div key={post} className="post-card">
            <div className="post-votes">
              <button><i className="fas fa-arrow-up"></i></button>
              <span>1.2k</span>
              <button><i className="fas fa-arrow-down"></i></button>
            </div>
            <div className="post-content">
              <div className="post-header">
                <img src="https://via.placeholder.com/24" alt="Community" />
                <span className="community-name">r/programming</span>
                <span className="post-meta">Posted by u/username • 5 hours ago</span>
              </div>
              <h3 className="post-title">This is a sample post title</h3>
              <p className="post-text">This is the post content. It can be quite long and will be truncated if it exceeds the maximum height.</p>
              <div className="post-actions">
                <button><i className="fas fa-comment"></i> 234 Comments</button>
                <button><i className="fas fa-share"></i> Share</button>
                <button><i className="fas fa-bookmark"></i> Save</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
