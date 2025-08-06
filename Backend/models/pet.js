const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Dog, Cat, Bird, etc.
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true }, // Male, Female
  size: { type: String, required: true }, // Small, Medium, Large
  color: { type: String, required: true },
  traits: [{ type: String }], // Array of traits like "Friendly", "Playful", etc.
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  additionalImages: [{ type: String }],
  adoptionFee: { type: Number, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  medicalInfo: { type: String, required: true },
  story: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pet", petSchema); 