import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import SearchFilter from "../components/SearchFilter"
import PetCard from "../components/PetCard"
import "./Home.css"

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pets?limit=4');
        if (response.ok) {
          const pets = await response.json();
          setFeaturedPets(pets);
        } else {
          // Fallback to static data if API fails
          setFeaturedPets([
            {
              _id: "507f1f77bcf86cd799439011",
              name: "Max",
              type: "Dog",
              breed: "Golden Retriever",
              age: 2,
              traits: ["Friendly", "Playful", "Good with kids"],
              imageUrl: "/d3.jpg",
            },
            {
              _id: "507f1f77bcf86cd799439012",
              name: "Luna",
              type: "Cat",
              breed: "Siamese",
              age: 1,
              traits: ["Calm", "Independent", "Affectionate"],
              imageUrl: "/c1.jpg",
            },
            {
              _id: "507f1f77bcf86cd799439013",
              name: "Buddy",
              type: "Dog",
              breed: "Beagle",
              age: 3,
              traits: ["Energetic", "Curious", "Friendly"],
              imageUrl: "/d1.jpg",
            },
            {
              _id: "507f1f77bcf86cd799439014",
              name: "Oliver",
              type: "Cat",
              breed: "Tabby",
              age: 4,
              traits: ["Playful", "Gentle", "Good with other cats"],
              imageUrl: "/c2.jpg",
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching featured pets:', error);
        // Fallback to static data
        setFeaturedPets([
          {
            _id: "507f1f77bcf86cd799439011",
            name: "Max",
            type: "Dog",
            breed: "Golden Retriever",
            age: 2,
            traits: ["Friendly", "Playful", "Good with kids"],
            imageUrl: "/d3.jpg",
          },
          {
            _id: "507f1f77bcf86cd799439012",
            name: "Luna",
            type: "Cat",
            breed: "Siamese",
            age: 1,
            traits: ["Calm", "Independent", "Affectionate"],
            imageUrl: "/c1.jpg",
          },
          {
            _id: "507f1f77bcf86cd799439013",
            name: "Buddy",
            type: "Dog",
            breed: "Beagle",
            age: 3,
            traits: ["Energetic", "Curious", "Friendly"],
            imageUrl: "/d1.jpg",
          },
          {
            _id: "507f1f77bcf86cd799439014",
            name: "Oliver",
            type: "Cat",
            breed: "Tabby",
            age: 4,
            traits: ["Playful", "Gentle", "Good with other cats"],
            imageUrl: "/c2.jpg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPets();
  }, []);

    if (loading) {
    return (
      <div className="home-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading featured pets...</p>
        </div>
      </div>
    );
  }

    return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: "url('/rearview.jpg')" }}>
        <div className="hero-content container">
          <h1 className="hero-title">Find Your Perfect Companion</h1>
          <p className="hero-subtitle">Adopt, don't shop. Give a loving home to a pet in need.</p>
          <div className="hero-buttons">
            <Link to="/pets" className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>
              Adopt Now
            </Link>
            <Link to="/about" className="btn btn-secondary" onClick={() => window.scrollTo(0, 0)}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <SearchFilter />
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="featured-pets-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Pets Looking for a Home</h2>
            <Link to="/pets" className="view-all-link" onClick={() => window.scrollTo(0, 0)}>
              View all pets
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          <div className="pets-grid">
            {featuredPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Process Section */}
      <section className="adoption-process-section">
        <div className="container">
          <h2 className="section-title text-center">How Adoption Works</h2>

          <div className="process-steps">
            <div className="process-step">
              <div className="process-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 className="process-title">1. Find Your Match</h3>
              <p className="process-description">
                Browse our available pets and use filters to find the perfect companion that matches your lifestyle.
              </p>
            </div>

            <div className="process-step">
              <div className="process-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                </svg>
              </div>
              <h3 className="process-title">2. Meet & Greet</h3>
              <p className="process-description">
                Schedule a visit to meet your potential new family member and see if you're a good match for each other.
              </p>
            </div>

            <div className="process-step">
              <div className="process-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49 -1.46 3 -3.21 3 -5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0 -3 .5 -4.5 2c-1.5 -1.5 -2.74 -2 -4.5 -2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="process-title">3. Welcome Home</h3>
              <p className="process-description">
                Complete the adoption process, pay the adoption fee, and welcome your new best friend to their forever
                home.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/pets" className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>
              Start Your Adoption Journey
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Find Your Perfect Companion?</h2>
          <p className="cta-description">
            Thousands of loving pets are waiting for their forever homes. Start your search today and change a life
            forever.
          </p>
          <div className="cta-buttons">
            <Link to="/pets" className="btn btn-secondary" onClick={() => window.scrollTo(0, 0)}>
              Browse Available Pets
            </Link>
            <Link to="/foster" className="btn btn-outline" onClick={() => window.scrollTo(0, 0)}>
              Learn About Fostering
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

