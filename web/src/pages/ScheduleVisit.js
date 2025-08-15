"use client"

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ScheduleVisit.css";

const ScheduleVisit = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    visitReason: "",
    additionalNotes: "",
    numberOfVisitors: "1",
    agreement: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`https://pet-shielders-main.onrender.com/api/pets/${petId}`);
        if (response.ok) {
          const petData = await response.json();
          setPet(petData);
        } else {
          navigate('/pets');
        }
      } catch (error) {
        console.error('Error fetching pet:', error);
        navigate('/pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send the visit request to the backend
      const response = await fetch('https://pet-shielders-main.onrender.com/api/visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId: petId,
          petName: pet.name,
          ...formData
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for scheduling a visit! We will contact you within 24 hours to confirm your appointment and provide visit details.'
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          visitReason: "",
          additionalNotes: "",
          numberOfVisitors: "1",
          agreement: false
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to schedule visit');
      }
    } catch (error) {
      console.error('Error scheduling visit:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to schedule visit. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (loading) {
    return (
      <div className="schedule-visit-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading pet information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="schedule-visit-page">
        <div className="container">
          <div className="error-container">
            <h2>Pet Not Found</h2>
            <p>Sorry, we couldn't find the pet you're looking for.</p>
            <button onClick={() => navigate('/pets')} className="btn btn-primary">
              Browse Available Pets
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-visit-page">
      <div className="visit-hero">
        <div className="container">
          <h1>Schedule a Visit with {pet.name}</h1>
          <p>Come meet {pet.name} in person at our shelter</p>
        </div>
      </div>

      <div className="container">
        <div className="visit-content">
          <div className="pet-info-card">
            <div className="pet-image">
              <img src={pet.imageUrl} alt={pet.name} />
            </div>
            <div className="pet-details">
              <h2>{pet.name}</h2>
              <div className="pet-stats">
                <span><strong>Breed:</strong> {pet.breed}</span>
                <span><strong>Age:</strong> {pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
                <span><strong>Gender:</strong> {pet.gender}</span>
                <span><strong>Size:</strong> {pet.size}</span>
              </div>
              <div className="visit-info">
                <strong>Location:</strong> {pet.location}
              </div>
              <p className="pet-description">{pet.description}</p>
            </div>
          </div>

          <div className="form-container">
            <h2>Schedule Your Visit</h2>
            
            {submitStatus && (
              <div className={`submit-message ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="visit-form">
              <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Visit Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredDate">Preferred Date *</label>
                    <select
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a date</option>
                      {getAvailableDates().map(date => {
                        const dateObj = new Date(date);
                        const formattedDate = dateObj.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        });
                        return (
                          <option key={date} value={date}>
                            {formattedDate}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="preferredTime">Preferred Time *</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="numberOfVisitors">Number of Visitors</label>
                    <select
                      id="numberOfVisitors"
                      name="numberOfVisitors"
                      value={formData.numberOfVisitors}
                      onChange={handleChange}
                    >
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5+">5+ people</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="visitReason">Reason for Visit *</label>
                  <select
                    id="visitReason"
                    name="visitReason"
                    value={formData.visitReason}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="meet-pet">Just want to meet {pet.name}</option>
                    <option value="considering-adoption">Considering adoption</option>
                    <option value="serious-adoption">Serious about adoption</option>
                    <option value="family-visit">Family visit to see if pet fits</option>
                    <option value="other">Other reason</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="additionalNotes">Additional Notes</label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any special requests or information you'd like us to know..."
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="visit-guidelines">
                  <h3>Visit Guidelines</h3>
                  <ul>
                    <li>Visits are typically 30-45 minutes long</li>
                    <li>Please arrive 10 minutes before your scheduled time</li>
                    <li>Children under 18 must be accompanied by an adult</li>
                    <li>We may need to reschedule if {pet.name} is not available</li>
                    <li>Please wear comfortable clothing suitable for interaction</li>
                  </ul>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleChange}
                      required
                    />
                    <span className="checkmark"></span>
                    I understand the visit guidelines and agree to follow them. I will contact you if I need to cancel or reschedule.
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate(`/pets/${petId}`)}
                  className="btn btn-secondary"
                >
                  Back to Pet Details
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !formData.agreement}
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisit; 