const mongoose = require("mongoose");

const fosterSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  experience: { type: String },
  homeType: { type: String },
  otherPets: { type: String },
  children: { type: String },
  timeAvailable: { type: String },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Under Review', 'Approved', 'Rejected', 'Active'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  reviewedBy: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model("Foster", fosterSchema); 