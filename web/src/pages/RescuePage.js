"use client"

import React, { useState } from "react";
import "../pages/RescuePage.css";

const RescuePage = () => {
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    location: "",
    description: "",
    contact: "",
    urgency: "Medium",
    reportedBy: "",
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // In a real app, you would upload the image to a cloud service first
      // For now, we'll just send the form data without the image
      const rescueData = {
        ...formData,
        imageUrl: formData.image ? formData.image.name : null,
      };

      const response = await fetch('http://localhost:5000/api/rescue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rescueData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Rescue request submitted successfully! Our team will contact you soon.'
        });
        
        // Reset form
        setFormData({
          petName: "",
          petType: "",
          location: "",
          description: "",
          contact: "",
          urgency: "Medium",
          reportedBy: "",
          image: null,
        });
      } else {
        throw new Error('Failed to submit rescue request');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit rescue request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rescue-page">
      <div className="rescue-hero">
        <div className="container">
          <h1 className="rescue-title">Pet Rescue & Emergency</h1>
          <p className="rescue-subtitle">
            Help us save animals in need. Report a pet that needs rescue or emergency assistance.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="rescue-content">
          <div className="rescue-info">
            <div className="info-section">
              <h2>How Pet Rescue Works</h2>
              <div className="rescue-steps">
                <div className="step">
                  <div className="step-icon">📞</div>
                  <h3>Report</h3>
                  <p>Fill out the form below with details about the pet in need</p>
                </div>
                <div className="step">
                  <div className="step-icon">🚨</div>
                  <h3>Emergency Response</h3>
                  <p>Our rescue team will be notified immediately</p>
                </div>
                <div className="step">
                  <div className="step-icon">🏥</div>
                  <h3>Rescue & Care</h3>
                  <p>We'll rescue the pet and provide necessary medical care</p>
                </div>
                <div className="step">
                  <div className="step-icon">🏠</div>
                  <h3>Find Home</h3>
                  <p>Once healthy, we'll find the pet a loving forever home</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>When to Report a Pet for Rescue</h2>
              <div className="rescue-reasons">
                <div className="reason">
                  <h4>🚨 Injured Animals</h4>
                  <p>Any pet that appears injured, sick, or in distress</p>
                </div>
                <div className="reason">
                  <h4>🏠 Abandoned Pets</h4>
                  <p>Pets left behind or abandoned by their owners</p>
                </div>
                <div className="reason">
                  <h4>🌪️ Natural Disasters</h4>
                  <p>Pets affected by floods, fires, or other emergencies</p>
                </div>
                <div className="reason">
                  <h4>🚗 Traffic Accidents</h4>
                  <p>Pets involved in or near traffic accidents</p>
                </div>
                <div className="reason">
                  <h4>🔒 Trapped Animals</h4>
                  <p>Pets trapped in dangerous situations</p>
                </div>
                <div className="reason">
                  <h4>👶 Stray Puppies/Kittens</h4>
                  <p>Young animals without their mothers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rescue-form-container">
            <h2>Report a Pet for Rescue</h2>
            
            {submitStatus && (
              <div className={`submit-message ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}

            <form className="rescue-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="petName">Pet's Name (if known)</label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    placeholder="Enter pet's name or 'Unknown'"
                    value={formData.petName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="petType">Pet Type *</label>
                  <select
                    id="petType"
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select pet type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Street address or area description"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="urgency">Urgency Level *</label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    required
                  >
                    <option value="Low">Low - Pet appears healthy but needs help</option>
                    <option value="Medium">Medium - Pet needs attention soon</option>
                    <option value="High">High - Pet is in immediate danger</option>
                    <option value="Critical">Critical - Life-threatening emergency</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact">Your Contact Number *</label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    placeholder="Your phone number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reportedBy">Your Name *</label>
                  <input
                    type="text"
                    id="reportedBy"
                    name="reportedBy"
                    placeholder="Your full name"
                    value={formData.reportedBy}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Detailed Description *</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the pet's condition, situation, and any other relevant details..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Photo (optional)</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <small>Upload a photo if possible to help our rescue team</small>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary rescue-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Rescue Request'}
              </button>
            </form>

            {formData.image && (
              <div className="image-preview">
                <h4>Image Preview:</h4>
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Pet Preview"
                />
              </div>
            )}
          </div>
        </div>

        <div className="emergency-contact">
          <h2>Emergency Contact Information</h2>
          <div className="emergency-grid">
            <div className="emergency-card">
              <h3>🚨 24/7 Emergency Hotline</h3>
              <p className="phone">(555) 123-4567</p>
              <p>For life-threatening emergencies</p>
            </div>
            <div className="emergency-card">
              <h3>🏥 Veterinary Emergency</h3>
              <p className="phone">(555) 987-6543</p>
              <p>Emergency veterinary services</p>
            </div>
            <div className="emergency-card">
              <h3>👮 Animal Control</h3>
              <p className="phone">(555) 456-7890</p>
              <p>For dangerous or aggressive animals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescuePage;
