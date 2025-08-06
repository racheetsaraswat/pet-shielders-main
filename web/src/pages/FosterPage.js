"use client"

import React from "react";
import { Link } from "react-router-dom";
import "./FosterPage.css";

const FosterPage = () => {
  const fosteringBenefits = [
    {
      title: "Save Lives",
      description: "Provide temporary care for pets in need, giving them a second chance at finding their forever home.",
      icon: "❤️"
    },
    {
      title: "Flexible Commitment",
      description: "Fostering allows you to help pets without the long-term commitment of adoption.",
      icon: "⏰"
    },
    {
      title: "Learn & Grow",
      description: "Gain valuable experience in pet care and behavior training.",
      icon: "📚"
    },
    {
      title: "Make a Difference",
      description: "Directly impact the lives of animals and help reduce shelter overcrowding.",
      icon: "🌟"
    }
  ];

  const requirements = [
    "Must be 18 years or older",
    "Have a stable living situation",
    "Be able to provide basic care (food, water, shelter)",
    "Have time to spend with the foster pet",
    "Be willing to transport pets to vet appointments",
    "Have landlord approval if renting",
    "Complete a home visit and application process"
  ];

  const responsibilities = [
    "Provide daily care including feeding, exercise, and grooming",
    "Monitor the pet's health and behavior",
    "Attend veterinary appointments as needed",
    "Socialize and train the pet",
    "Provide updates and photos to the shelter",
    "Be available for potential adopters to meet the pet",
    "Return the pet to the shelter when requested"
  ];

  return (
    <div className="foster-page">
      {/* Hero Section */}
      <section className="foster-hero">
        <div className="container">
          <h1>Become a Foster Parent</h1>
          <p>Give temporary love and care to pets in need while they wait for their forever homes</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="foster-overview">
        <div className="container">
          <div className="overview-content">
            <h2>What is Fostering?</h2>
            <p>
              Fostering is providing temporary care for pets who are not yet ready for adoption. 
              This could include puppies and kittens too young for adoption, pets recovering from 
              medical procedures, or animals who need socialization and training.
            </p>
            
            <div className="foster-stats">
              <div className="stat-card">
                <h3>500+</h3>
                <p>Pets Fostered</p>
              </div>
              <div className="stat-card">
                <h3>200+</h3>
                <p>Active Foster Homes</p>
              </div>
              <div className="stat-card">
                <h3>95%</h3>
                <p>Adoption Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="foster-benefits">
        <div className="container">
          <h2>Benefits of Fostering</h2>
          <div className="benefits-grid">
            {fosteringBenefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="foster-requirements">
        <div className="container">
          <h2>Foster Requirements</h2>
          <div className="requirements-list">
            {requirements.map((requirement, index) => (
              <div key={index} className="requirement-item">
                <span className="checkmark">✓</span>
                <span>{requirement}</span>
              </div>
            ))}
          </div>
          
          <div className="info-box">
            <h3>Important Note</h3>
            <p>
              We provide all necessary supplies including food, medical care, and basic equipment. 
              You provide the love, time, and safe environment.
            </p>
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="foster-responsibilities">
        <div className="container">
          <h2>Foster Responsibilities</h2>
          <div className="responsibilities-list">
            {responsibilities.map((responsibility, index) => (
              <div key={index} className="responsibility-item">
                <span className="bullet">•</span>
                <span>{responsibility}</span>
              </div>
            ))}
          </div>
          
          <div className="support-info">
            <h3>We're Here to Support You</h3>
            <p>
              Our team provides 24/7 support, training resources, and a community of experienced 
              foster parents to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="foster-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-section">
            <h3>How long do I foster a pet?</h3>
            <p>
              Foster periods vary from a few days to several months, depending on the pet's needs. 
              We'll discuss the expected duration before you commit.
            </p>
          </div>

          <div className="faq-section">
            <h3>What if I want to adopt my foster pet?</h3>
            <p>
              Foster parents often have first priority to adopt their foster pets. We encourage 
              foster-to-adopt arrangements when it's a good match.
            </p>
          </div>

          <div className="faq-section">
            <h3>Do I need experience with pets?</h3>
            <p>
              While experience is helpful, it's not required. We provide training and support 
              for all foster parents, regardless of experience level.
            </p>
          </div>

          <div className="faq-section">
            <h3>What if I can't continue fostering?</h3>
            <p>
              We understand that circumstances can change. We ask for as much notice as possible 
              so we can arrange alternative care for the pet.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <div className="container">
          <h2>Foster Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-image">
                <img src="/d1.jpg" alt="Foster Success Story" />
              </div>
              <div className="story-content">
                <h3>Buddy's Journey</h3>
                <p>
                  "Fostering Buddy was one of the most rewarding experiences. He came to us scared 
                  and timid, but with love and patience, he blossomed into a confident, loving dog 
                  who found his forever home."
                </p>
                <span className="story-author">- Sarah M., Foster Parent</span>
              </div>
            </div>
            
            <div className="story-card">
              <div className="story-image">
                <img src="/c1.jpg" alt="Foster Success Story" />
              </div>
              <div className="story-content">
                <h3>Luna's Recovery</h3>
                <p>
                  "Luna needed special care after surgery. Watching her recover and regain her 
                  strength was incredible. She's now living happily with her adoptive family."
                </p>
                <span className="story-author">- Mike R., Foster Parent</span>
              </div>
            </div>

            <div className="story-card">
              <div className="story-image">
                <img src="/d2.jpg" alt="Foster Success Story" />
              </div>
              <div className="story-content">
                <h3>Max's Transformation</h3>
                <p>
                  "Max was a shy puppy when he first came to us. Through daily socialization and 
                  training, he became a confident, playful companion who found his perfect family."
                </p>
                <span className="story-author">- Jennifer L., Foster Parent</span>
              </div>
            </div>

            <div className="story-card">
              <div className="story-image">
                <img src="/c2.jpg" alt="Foster Success Story" />
              </div>
              <div className="story-content">
                <h3>Oliver's Second Chance</h3>
                <p>
                  "Oliver was found as a stray with health issues. After months of care and love, 
                  he's now healthy and living with a wonderful family who adores him."
                </p>
                <span className="story-author">- David K., Foster Parent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="foster-cta">
        <div className="container">
          <h2>Ready to Start Your Fostering Journey?</h2>
          <p>
            Join our community of foster parents and help save lives. Every foster home makes a difference.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
            <Link to="/pets" className="btn btn-secondary">
              Browse Available Pets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FosterPage; 