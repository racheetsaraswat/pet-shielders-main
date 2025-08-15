"use client"

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AdoptionForm.css";

const AdoptionForm = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    occupation: "",
    experience: "",
    reason: "",
    otherPets: "",
    children: "",
    homeType: "",
    yardSize: "",
    timeAlone: "",
    budget: "",
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
      // Send the adoption application to the backend
      const response = await fetch('https://pet-shielders-main.onrender.com/api/adoption', {
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
          message: 'Thank you for your adoption application! We will review your information and contact you within 2-3 business days to discuss next steps.'
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          occupation: "",
          experience: "",
          reason: "",
          otherPets: "",
          children: "",
          homeType: "",
          yardSize: "",
          timeAlone: "",
          budget: "",
          agreement: false
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting adoption application:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="adoption-form-page">
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
      <div className="adoption-form-page">
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
    <div className="adoption-form-page">
      <div className="adoption-hero">
        <div className="container">
          <h1>Adopt {pet.name}</h1>
          <p>Complete the adoption application for {pet.name}</p>
        </div>
      </div>

      <div className="container">
        <div className="adoption-content">
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
              <div className="adoption-fee">
                <strong>Adoption Fee:</strong> ${pet.adoptionFee}
              </div>
              <p className="pet-description">{pet.description}</p>
            </div>
          </div>

          <div className="form-container">
            <h2>Adoption Application</h2>
            
            {submitStatus && (
              <div className={`submit-message ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="adoption-form">
              <div className="form-section">
                <h3>Personal Information</h3>
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

                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Pet Experience & Lifestyle</h3>
                <div className="form-group">
                  <label htmlFor="occupation">Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Previous Pet Experience</label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about your experience with pets..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reason">Why do you want to adopt {pet.name}?</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="otherPets">Do you have other pets?</label>
                    <input
                      type="text"
                      id="otherPets"
                      name="otherPets"
                      value={formData.otherPets}
                      onChange={handleChange}
                      placeholder="Yes/No - If yes, please describe"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="children">Do you have children?</label>
                    <input
                      type="text"
                      id="children"
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      placeholder="Yes/No - Ages if applicable"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="homeType">Type of Home</label>
                    <select
                      id="homeType"
                      name="homeType"
                      value={formData.homeType}
                      onChange={handleChange}
                    >
                      <option value="">Select home type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="yardSize">Yard Size</label>
                    <select
                      id="yardSize"
                      name="yardSize"
                      value={formData.yardSize}
                      onChange={handleChange}
                    >
                      <option value="">Select yard size</option>
                      <option value="none">No yard</option>
                      <option value="small">Small yard</option>
                      <option value="medium">Medium yard</option>
                      <option value="large">Large yard</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="timeAlone">How long will the pet be alone?</label>
                    <select
                      id="timeAlone"
                      name="timeAlone"
                      value={formData.timeAlone}
                      onChange={handleChange}
                    >
                      <option value="">Select time</option>
                      <option value="0-2">0-2 hours</option>
                      <option value="2-4">2-4 hours</option>
                      <option value="4-8">4-8 hours</option>
                      <option value="8+">8+ hours</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Monthly pet budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select budget</option>
                      <option value="0-50">$0-50</option>
                      <option value="50-100">$50-100</option>
                      <option value="100-200">$100-200</option>
                      <option value="200+">$200+</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
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
                    I agree to provide a loving home and proper care for {pet.name}. I understand that adoption is a lifelong commitment.
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
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm; 