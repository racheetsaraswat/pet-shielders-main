const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  petName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  occupation: { type: String },
  experience: { type: String },
  reason: { type: String, required: true },
  otherPets: { type: String },
  children: { type: String },
  homeType: { type: String },
  yardSize: { type: String },
  timeAlone: { type: String },
  budget: { type: String },
  status: { type: String, enum: ['Pending', 'Under Review', 'Approved', 'Rejected', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  reviewedBy: { type: String }
});

module.exports = mongoose.model("Adoption", adoptionSchema); 