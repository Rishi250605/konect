import React, { useState } from 'react';
import './Events.css';
import CreateEventModal from '../components/CreateEventModal';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'AI Workshop Series',
      category: 'tech',
      date: '2024-03-15',
      time: '14:00',
      location: 'Tech Hub - Room 201',
      organizer: 'Tech Club',
      description: 'Join us for an intensive workshop series on Artificial Intelligence and Machine Learning.',
      image:"data:image/png;base64,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",
      attendees: 45,
      maxCapacity: 100,
      social: {
        website: 'https://techclub.com',
        twitter: '@techclub',
        instagram: '@techclub_official'
      }
    },
    {
      id: 2,
      title: 'Annual Cultural Fest',
      category: 'cultural',
      date: '2024-03-20',
      time: '10:00',
      location: 'Main Auditorium',
      organizer: 'Cultural Committee',
      description: 'A celebration of art, music, and dance featuring performances from talented students.',
      image: 'data:image/jpeg;base64,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',
      attendees: 120,
      maxCapacity: 500,
      social: {
        instagram: '@culturalfest'
      }
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Events', icon: '📅' },
    { id: 'tech', name: 'Tech', icon: '💻' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'cultural', name: 'Cultural', icon: '🎭' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ];

  const handleCreateEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const handleRegisterClick = (gformUrl) => {
    window.open(gformUrl, '_blank');
  };

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Campus Events</h1>
        <button className="create-event-btn" onClick={() => setIsModalOpen(true)}>
          <i className="fas fa-plus"></i> Create Event
        </button>
      </div>

      <div className="events-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              <img src={event.image} alt={event.title} />
              <div className="event-date">
                <div className="date-day">{new Date(event.date).getDate()}</div>
                <div className="date-month">
                  {new Date(event.date).toLocaleString('default', { month: 'short' })}
                </div>
              </div>
            </div>
            <div className="event-content">
              <div className="event-category">
                <span className={`category-tag ${event.category}`}>
                  {categories.find(cat => cat.id === event.category)?.name}
                </span>
              </div>
              <h3 className="event-title">{event.title}</h3>
              <div className="event-details">
                <div className="detail-item">
                  <i className="fas fa-clock"></i>
                  <span>{event.time}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.location}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-users"></i>
                  <span>{event.attendees}/{event.maxCapacity} attending</span>
                </div>
              </div>
              <p className="event-description">{event.description}</p>
              <div className="event-footer">
                <div className="organizer">
                  <span>By {event.organizer}</span>
                </div>
                <div className="event-actions">
                  <button 
                    className="register-btn" 
                    onClick={() => handleRegisterClick(event.gformUrl)}
                  >
                    Register Now
                  </button>
                  <button className="share-btn">
                    <i className="fas fa-share-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
};

export default Events; 