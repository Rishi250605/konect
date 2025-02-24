import React from 'react';
import './Groups.css';

const Groups = () => {
  const demoGroups = [
    {
      id: 1,
      name: "Study Hub",
      icon: "📚",
      category: "Education",
      members: 1250,
      channels: [
        { id: 1, name: "general", icon: "# " },
        { id: 2, name: "homework-help", icon: "# " },
        { id: 3, name: "study-resources", icon: "# " }
      ]
    },
    {
      id: 2,
      name: "GenAI Enthusiasts",
      icon: "🤖",
      category: "Technology",
      members: 3420,
      channels: [
        { id: 1, name: "general", icon: "# " },
        { id: 2, name: "ai-news", icon: "# " },
        { id: 3, name: "project-showcase", icon: "# " }
      ]
    },
    {
      id: 3,
      name: "Gaming Zone",
      icon: "🎮",
      category: "Gaming",
      members: 5600,
      channels: [
        { id: 1, name: "general", icon: "# " },
        { id: 2, name: "looking-for-team", icon: "# " },
        { id: 3, name: "tournaments", icon: "# " }
      ]
    },
    {
      id: 4,
      name: "Book Club",
      icon: "📖",
      category: "Hobbies",
      members: 890,
      channels: [
        { id: 1, name: "general", icon: "# " },
        { id: 2, name: "monthly-reads", icon: "# " },
        { id: 3, name: "recommendations", icon: "# " }
      ]
    }
  ];

  const [activeGroup, setActiveGroup] = React.useState(demoGroups[0]);
  const [activeChannel, setActiveChannel] = React.useState(demoGroups[0].channels[0]);

  return (
    <div className="page-container">
      <div className="groups-container">
        {/* Groups Sidebar */}
        <div className="groups-sidebar">
          <div className="groups-list">
            {demoGroups.map(group => (
              <div 
                key={group.id}
                className={`group-icon ${activeGroup.id === group.id ? 'active' : ''}`}
                onClick={() => setActiveGroup(group)}
                title={group.name}
              >
                <span>{group.icon}</span>
                <div className="group-pill"></div>
              </div>
            ))}
            <div className="group-icon add-group">
              <i className="fas fa-plus"></i>
            </div>
          </div>
        </div>

        {/* Channels Sidebar */}
        <div className="channels-sidebar">
          <div className="group-header">
            <h2>{activeGroup.name}</h2>
            <i className="fas fa-chevron-down"></i>
          </div>
          <div className="channels-section">
            <div className="section-header">
              <i className="fas fa-chevron-down"></i>
              <span>TEXT CHANNELS</span>
            </div>
            <div className="channels-list">
              {activeGroup.channels.map(channel => (
                <div 
                  key={channel.id}
                  className={`channel-item ${activeChannel.id === channel.id ? 'active' : ''}`}
                  onClick={() => setActiveChannel(channel)}
                >
                  <span className="channel-icon">{channel.icon}</span>
                  <span className="channel-name">{channel.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-area">
          <div className="chat-header">
            <div className="channel-info">
              <span className="channel-icon">#</span>
              <span className="channel-name">{activeChannel.name}</span>
            </div>
            <div className="header-actions">
              <i className="fas fa-bell"></i>
              <i className="fas fa-users"></i>
              <i className="fas fa-search"></i>
              <i className="fas fa-inbox"></i>
              <i className="fas fa-question-circle"></i>
            </div>
          </div>
          <div className="chat-messages">
            <div className="welcome-message">
              <h2>Welcome to #{activeChannel.name}!</h2>
              <p>This is the start of the #{activeChannel.name} channel.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups; 