import { Link } from "react-router-dom"
import "./PetCard.css"

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <div className="pet-card-image-container">
        <img
          src={pet.imageUrl || "https://via.placeholder.com/300x200?text=Pet+Image"}
          alt={pet.name}
          className="pet-card-image"
        />
        <span className="pet-type-badge">{pet.type}</span>
      </div>
      <div className="pet-card-content">
        <div className="pet-card-header">
          <h3 className="pet-name">{pet.name}</h3>
          <span className="pet-age">
            {pet.age} {pet.age === 1 ? "year" : "years"}
          </span>
        </div>
        <p className="pet-breed">{pet.breed}</p>
        <p className="pet-traits">{pet.traits.join(", ")}</p>
        <Link to={`/pets/${pet._id}`} className="btn btn-primary pet-card-btn" onClick={() => window.scrollTo(0, 0)}>
          View Details
        </Link>
      </div>
    </div>
  )
}

export default PetCard

