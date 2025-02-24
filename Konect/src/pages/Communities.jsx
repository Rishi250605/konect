import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Communities.css';
import axios from 'axios';
const Communities = () => {
    const [communities, setCommunities] = useState();
    useEffect(()=>{
        const getCommunity = async () =>{
            const communities = await axios.get("http://localhost:5000/api/v1/community");
            setCommunities(communities.data);
            console.log("community data",communities.data);
        } 
        getCommunity();
    },[])
    // const communities = [
    //     {
    //         id: 'frontend',
    //         name: 'Frontend Development',
    //         members: 1234,
    //         description: 'A community for frontend developers to share knowledge, ask questions, and discuss latest trends in web development.',
    //         icon: '🎨'
    //     },
    //     // Add more communities here
    // ];

    return (
        <div className="communities-page">
            <div className="communities-header">
                <h1>Communities</h1>
                <button className="create-community-btn">
                    <i className="fas fa-plus"></i> Create Community
                </button>
            </div>

            <div className="communities-grid">
                {communities && communities.map((community , index)=> (
                    <Link to={`/community/${community.id}`} key={index} className="community-card">
                        <div className="community-icon">{community.icon}</div>
                        <div className="community-info">
                            <h3>{community.name}</h3>
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