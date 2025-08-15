"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import SearchFilter from "../components/SearchFilter"
import PetCard from "../components/PetCard"
import "./PetListing.css"

// This will be fetched from the API

const PetListing = () => {
  const location = useLocation()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const queryParams = new URLSearchParams(location.search)
        const type = queryParams.get("type")
        const breed = queryParams.get("breed")
        const age = queryParams.get("age")
        const locationFilter = queryParams.get("location")

        // Build query string
        const params = new URLSearchParams()
        if (type) params.append('type', type)
        if (breed) params.append('breed', breed)
        if (age) params.append('age', age)
        if (locationFilter) params.append('location', locationFilter)

        const response = await fetch(`https://pet-shielders-main.onrender.com/api/pets?${params.toString()}`)
        if (response.ok) {
          const petsData = await response.json()
          setPets(petsData)
        } else {
          setPets([])
        }
      } catch (error) {
        console.error('Error fetching pets:', error)
        setPets([])
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [location.search])

  return (
    <div className="pet-listing-page">
      <div className="container">
        <h1 className="page-title">Available Pets</h1>

        <SearchFilter />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading pets...</p>
          </div>
        ) : pets.length === 0 ? (
          <div className="no-results">
            <h2>No pets found</h2>
            <p>Try adjusting your search filters to find more pets.</p>
          </div>
        ) : (
          <>
            <p className="results-count">{pets.length} pets found</p>
            <div className="pets-grid">
              {pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PetListing

