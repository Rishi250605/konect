import React, { useState } from 'react';
import './CreateEventModal.css';

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
  const [eventData, setEventData] = useState({
    title: '',
    category: 'tech',
    date: '',
    time: '',
    location: '',
    organizer: '',
    description: '',
    maxCapacity: '',
    gformUrl: '',
    image: 'https://via.placeholder.com/400x200' // Default image
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventData,
      id: Date.now(), // Generate a unique ID
      attendees: 0, // Start with 0 attendees
      social: {} // Empty social links for now
    };
    onCreateEvent(newEvent);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
            >
              <option value="tech">Tech</option>
              <option value="academic">Academic</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date*</label>
              <input
                type="date"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time*</label>
              <input
                type="time"
                id="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="organizer">Organizer*</label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              value={eventData.organizer}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="maxCapacity">Maximum Capacity*</label>
            <input
              type="number"
              id="maxCapacity"
              name="maxCapacity"
              value={eventData.maxCapacity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gformUrl">Google Form URL for Registration*</label>
            <input
              type="url"
              id="gformUrl"
              name="gformUrl"
              value={eventData.gformUrl}
              onChange={handleChange}
              required
              placeholder="https://forms.google.com/..."
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal; 