"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./SearchFilter.css"

const SearchFilter = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [filters, setFilters] = useState({
    location: queryParams.get("location") || "",
    type: queryParams.get("type") || "",
    breed: queryParams.get("breed") || "",
    age: queryParams.get("age") || "",
    size: queryParams.get("size") || "",
    gender: queryParams.get("gender") || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      }
    })

    navigate({
      pathname: "/pets",
      search: params.toString(),
    })
  }

  return (
    <div className="search-filter">
      <h2 className="search-filter-title">Find Your New Best Friend</h2>
      <form onSubmit={handleSubmit} className="search-filter-form">
        <div className="search-filter-grid">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter your city or ZIP"
              value={filters.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Pet Type</label>
            <select id="type" name="type" value={filters.type} onChange={handleChange}>
              <option value="">Any</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="small-animal">Small Animal</option>
              <option value="reptile">Reptile</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="breed">Breed</label>
            <input
              type="text"
              id="breed"
              name="breed"
              placeholder="Any breed"
              value={filters.breed}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <select id="age" name="age" value={filters.age} onChange={handleChange}>
              <option value="">Any</option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="size">Size</label>
            <select id="size" name="size" value={filters.size} onChange={handleChange}>
              <option value="">Any</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={filters.gender} onChange={handleChange}>
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary search-btn">
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
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchFilter

