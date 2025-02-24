import React from 'react';
import './About.css';

const About = () => {
  const [activeCard, setActiveCard] = React.useState(null);

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const developers = [
    {
      name: "Aditya Kumar",
      role: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      description: "React & UI/UX Specialist",
      github: "https://github.com/aditya",
      linkedin: "https://linkedin.com/in/aditya",
      color: "#4CAF50"
    },
    {
      name: "Priya Sharma",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      description: "Node.js & Database Expert",
      github: "https://github.com/priya",
      linkedin: "https://linkedin.com/in/priya",
      color: "#2196F3"
    },
    {
      name: "Rahul Verma",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      description: "MERN Stack Developer",
      github: "https://github.com/rahul",
      linkedin: "https://linkedin.com/in/rahul",
      color: "#9C27B0"
    },
    {
      name: "Neha Singh",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      description: "Creative Design Lead",
      github: "https://github.com/neha",
      linkedin: "https://linkedin.com/in/neha",
      color: "#FF4081"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">Konect</span></h1>
          <p className="hero-description">
            Empowering communities through meaningful connections. Konect is a modern platform 
            designed to bring people together, foster engaging discussions, and build lasting 
            relationships around shared interests and passions.
          </p>
        </div>
        <div className="hero-shape"></div>
      </div>

      <div className="about-content">
        <section className="features-section">
          <h2>Why Choose <span className="highlight">Konect</span>?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-users"></i>
              <h3>Vibrant Communities</h3>
              <p>Join or create communities around your interests. Connect with like-minded people 
                and engage in meaningful discussions.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-comments"></i>
              <h3>Real-time Engagement</h3>
              <p>Experience seamless real-time conversations, instant notifications, and 
                interactive discussions with community members.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-video"></i>
              <h3>Live Streaming</h3>
              <p>Host and participate in live community events, webinars, and interactive 
                sessions to strengthen community bonds.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Safe & Secure</h3>
              <p>Enjoy a protected environment with advanced moderation tools and 
                community guidelines that ensure respectful interactions.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chart-line"></i>
              <h3>Analytics & Insights</h3>
              <p>Track community growth and engagement with detailed analytics dashboard.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile Friendly</h3>
              <p>Access your communities on the go with our responsive design.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our <span className="highlight">Team</span></h2>
          <p className="team-intro">Our dedicated team of professionals working to create the best community experience</p>
          <div className="carousel-container">
            <div className="developers-grid">
              {developers.map((dev, index) => (
                <div 
                  key={index} 
                  className={`developer-card card-${index + 1} ${activeCard === index ? 'active' : ''}`}
                  onClick={() => handleCardClick(index)}
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    '--card-color': dev.color 
                  }}
                >
                  <div className="dev-image-container">
                    <img src={dev.image} alt={dev.name} />
                    <div className="dev-overlay">
                      <div className="social-links">
                        <a 
                          href={dev.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="github-link"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                        <a 
                          href={dev.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="linkedin-link"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="dev-info">
                    <h3>{dev.name}</h3>
                    <h4>{dev.role}</h4>
                    <p>{dev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;