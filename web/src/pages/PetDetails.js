"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import "./PetDetails.css"

// This will be fetched from the API

const PetDetails = () => {
  const { id } = useParams()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState("")
  const [allPets, setAllPets] = useState([])

  useEffect(() => {
    const fetchPet = async () => {
      try {
        // Fetch the specific pet
        const petResponse = await fetch(`https://pet-shielders-main.onrender.com/api/pets/${id}`)
        if (petResponse.ok) {
          const petData = await petResponse.json()
          setPet(petData)
          setActiveImage(petData.imageUrl)
        } else {
          setPet(null)
        }

        // Fetch all pets for similar pets section
        const allPetsResponse = await fetch('https://pet-shielders-main.onrender.com/api/pets')
        if (allPetsResponse.ok) {
          const allPetsData = await allPetsResponse.json()
          setAllPets(allPetsData)
        }
      } catch (error) {
        console.error('Error fetching pet:', error)
        setPet(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPet()
  }, [id])

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading pet details...</p>
        </div>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Pet Not Found</h2>
          <p>Sorry, we couldn't find the pet you're looking for.</p>
          <Link to="/pets" className="btn btn-primary">
            Browse Available Pets
          </Link>
        </div>
      </div>  
    )
  }

  return (
    <div className="pet-details-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> &gt; <Link to="/pets">Pets</Link> &gt; <span>{pet.name}</span>
        </div>

        <div className="pet-details-grid">
          <div className="pet-images">
            <div className="main-image">
              <img src={activeImage || "/placeholder.svg"} alt={pet.name} />
            </div>
            <div className="thumbnail-images">
              <img
                src={pet.imageUrl || "/placeholder.svg"}
                alt={pet.name}
                className={activeImage === pet.imageUrl ? "active" : ""}
                onClick={() => setActiveImage(pet.imageUrl)}
              />
              {pet.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`${pet.name} ${index + 1}`}
                  className={activeImage === img ? "active" : ""}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="pet-info">
            <div className="pet-header">
              <h1 className="pet-name">{pet.name}</h1>
              <span className="pet-type-badge">{pet.type}</span>
            </div>

            <div className="pet-attributes">
              <div className="attribute">
                <span className="attribute-label">Breed:</span>
                <span className="attribute-value">{pet.breed}</span>
              </div>
              <div className="attribute">
                <span className="attribute-label">Age:</span>
                <span className="attribute-value">
                  {pet.age} {pet.age === 1 ? "year" : "years"}
                </span>
              </div>
              <div className="attribute">
                <span className="attribute-label">Gender:</span>
                <span className="attribute-value">{pet.gender}</span>
              </div>
              <div className="attribute">
                <span className="attribute-label">Size:</span>
                <span className="attribute-value">{pet.size}</span>
              </div>
              <div className="attribute">
                <span className="attribute-label">Color:</span>
                <span className="attribute-value">{pet.color}</span>
              </div>
            </div>

            <div className="pet-traits">
              {pet.traits.map((trait, index) => (
                <span key={index} className="trait-badge">
                  {trait}
                </span>
              ))}
            </div>

            <div className="pet-description">
              <h2>About {pet.name}</h2>
              <p>{pet.description}</p>
            </div>

            <div className="adoption-info">
              <div className="adoption-fee">
                <h3>Adoption Fee</h3>
                <p className="fee">${pet.adoptionFee}</p>
              </div>

              <div className="shelter-info">
                <h3>Location</h3>
                <p>{pet.location}</p>
                <p>{pet.address}</p>
              </div>
            </div>

            <div className="medical-info">
              <h3>Medical Information</h3>
              <p>{pet.medicalInfo}</p>
            </div>

            <div className="adoption-actions">
              <Link to={`/adopt/${pet._id}`} className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>Start Adoption Process</Link>
              <Link to={`/visit/${pet._id}`} className="btn btn-secondary" onClick={() => window.scrollTo(0, 0)}>Schedule a Visit</Link>
            </div>
          </div>
        </div>

        <div className="pet-story">
          <h2>{pet.name}'s Story</h2>
          <p>{pet.story}</p>
        </div>

        <div className="adoption-steps">
          <h2>Adoption Process</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Submit Application</h3>
              <p>Fill out our adoption application to express your interest in {pet.name}.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Meet & Greet</h3>
              <p>Schedule a time to meet {pet.name} in person at our shelter.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Home Check</h3>
              <p>We'll conduct a brief home check to ensure it's a safe environment for {pet.name}.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Finalize Adoption</h3>
              <p>Pay the adoption fee, sign the adoption contract, and welcome {pet.name} to your family!</p>
            </div>
          </div>
        </div>

        <div className="similar-pets">
          <h2>You May Also Like</h2>
          <div className="similar-pets-grid">
            {allPets
              .filter((p) => p._id !== id)
              .slice(0, 3)
              .map((pet) => (
                <div key={pet._id} className="similar-pet-card">
                  <img src={pet.imageUrl || "/placeholder.svg"} alt={pet.name} />
                  <div className="similar-pet-info">
                    <h3>{pet.name}</h3>
                    <p>
                      {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"}
                    </p>
                    <Link to={`/pets/${pet._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetDetails

