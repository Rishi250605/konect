import React from 'react';
import './Groups.css';

const Groups = () => {
  const [showMembers, setShowMembers] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  
  const demoGroups = [
    {
      id: 1,
      name: "Study Hub",
      icon: "📚",
      category: "Education",
      channels: [
        { id: 1, name: "general", icon: "# " },
        { id: 2, name: "homework-help", icon: "# " },
        { id: 3, name: "study-resources", icon: "# " }
      ],
      members: [
        { id: 1, name: "Alex Kumar", status: "online", avatar: "https://ui-avatars.com/api/?name=Alex+Kumar" },
        { id: 2, name: "Priya Singh", status: "online", avatar: "https://ui-avatars.com/api/?name=Priya+Singh" },
        { id: 3, name: "Rahul Verma", status: "idle", avatar: "https://ui-avatars.com/api/?name=Rahul+Verma" },
        { id: 4, name: "Sarah Khan", status: "offline", avatar: "https://ui-avatars.com/api/?name=Sarah+Khan" },
        { id: 5, name: "John Doe", status: "offline", avatar: "https://ui-avatars.com/api/?name=John+Doe" }
      ]
    },
    {
      id: 2,
      name: "GenAI Enthusiasts",
      icon: "🤖",
      category: "Technology",
      channels: [
        { id: 1, name: "general", icon: "# " },
        { id: 2, name: "ai-news", icon: "# " },
        { id: 3, name: "project-showcase", icon: "# " }
      ],
      members: [
        { id: 1, name: "David Chen", status: "online", avatar: "https://ui-avatars.com/api/?name=David+Chen" },
        { id: 2, name: "Emma Watson", status: "online", avatar: "https://ui-avatars.com/api/?name=Emma+Watson" },
        { id: 3, name: "Mike Ross", status: "idle", avatar: "https://ui-avatars.com/api/?name=Mike+Ross" },
        { id: 4, name: "Lisa Park", status: "offline", avatar: "https://ui-avatars.com/api/?name=Lisa+Park" }
      ]
    },
    {
      id: 3,
      name: "Gaming Zone",
      icon: "🎮",
      category: "Gaming",
      channels: [
        { id: 1, name: "general", icon: "# " },
        { id: 2, name: "looking-for-team", icon: "# " },
        { id: 3, name: "tournaments", icon: "# " }
      ],
      members: [
        { id: 1, name: "Tyler Smith", status: "online", avatar: "https://ui-avatars.com/api/?name=Tyler+Smith" },
        { id: 2, name: "Nina Garcia", status: "online", avatar: "https://ui-avatars.com/api/?name=Nina+Garcia" },
        { id: 3, name: "Chris Lee", status: "idle", avatar: "https://ui-avatars.com/api/?name=Chris+Lee" },
        { id: 4, name: "Anna Kim", status: "offline", avatar: "https://ui-avatars.com/api/?name=Anna+Kim" },
        { id: 5, name: "Tom Wilson", status: "offline", avatar: "https://ui-avatars.com/api/?name=Tom+Wilson" }
      ]
    },
    {
      id: 4,
      name: "Book Club",
      icon: "📖",
      category: "Hobbies",
      channels: [
        { id: 1, name: "general", icon: "# " },
        { id: 2, name: "monthly-reads", icon: "# " },
        { id: 3, name: "recommendations", icon: "# " }
      ],
      members: [
        { id: 1, name: "Jane Austen", status: "online", avatar: "https://ui-avatars.com/api/?name=Jane+Austen" },
        { id: 2, name: "Robert Frost", status: "idle", avatar: "https://ui-avatars.com/api/?name=Robert+Frost" },
        { id: 3, name: "Emily Bronte", status: "offline", avatar: "https://ui-avatars.com/api/?name=Emily+Bronte" }
      ]
    }
  ];

  const [activeGroup, setActiveGroup] = React.useState(demoGroups[0]);
  const [activeChannel, setActiveChannel] = React.useState(demoGroups[0].channels[0]);

  // Update active channel when changing groups
  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setActiveChannel(group.channels[0]); // Set to first channel of new group
    setShowMembers(false); // Optionally close members sidebar on group change
  };

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
                onClick={() => handleGroupChange(group)}
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
              <div className="tooltip-container">
                <i className="fas fa-bell" title="Notifications"></i>
                <span className="tooltip">Notifications</span>
              </div>
              <div className="tooltip-container">
                <i 
                  className="fas fa-search" 
                  onClick={() => setShowSearch(!showSearch)}
                  title="Search"
                ></i>
                <span className="tooltip">Search</span>
              </div>
              <div className="tooltip-container">
                <i className="fas fa-inbox" title="Inbox"></i>
                <span className="tooltip">Inbox</span>
              </div>
              <div className="tooltip-container">
                <i 
                  className="fas fa-users" 
                  onClick={() => setShowMembers(!showMembers)}
                  title="Members"
                ></i>
                <span className="tooltip">Members</span>
              </div>
            </div>
          </div>

          {showSearch && (
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="search-input"
              />
            </div>
          )}

          <div className="chat-content">
            <div className="chat-messages">
              <div className="welcome-message">
                <h2>Welcome to #{activeChannel.name}!</h2>
                <p>This is the start of the #{activeChannel.name} channel.</p>
              </div>
            </div>

            {/* Members Sidebar */}
            {showMembers && (
              <div className="members-sidebar">
                <div className="members-header">
                  <h3>Members — {activeGroup.members.length}</h3>
                </div>
                <div className="members-list">
                  <div className="members-category">
                    <h4>Online — {activeGroup.members.filter(m => m.status === 'online').length}</h4>
                    {activeGroup.members
                      .filter(member => member.status === 'online')
                      .map(member => (
                        <div key={member.id} className="member-item">
                          <div className="member-avatar">
                            <img src={member.avatar} alt={member.name} />
                            <span className={`status-indicator ${member.status}`}></span>
                          </div>
                          <span className="member-name">{member.name}</span>
                        </div>
                      ))}
                  </div>
                  <div className="members-category">
                    <h4>Offline — {activeGroup.members.filter(m => m.status === 'offline').length}</h4>
                    {activeGroup.members
                      .filter(member => member.status === 'offline')
                      .map(member => (
                        <div key={member.id} className="member-item">
                          <div className="member-avatar">
                            <img src={member.avatar} alt={member.name} />
                            <span className={`status-indicator ${member.status}`}></span>
                          </div>
                          <span className="member-name">{member.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups; 