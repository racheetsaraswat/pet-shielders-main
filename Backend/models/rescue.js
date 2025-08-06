const mongoose = require("mongoose");

const rescueSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  imageUrl: { type: String },
  urgency: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved', 'Closed'], default: 'Pending' },
  reportedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }
});

module.exports = mongoose.model("Rescue", rescueSchema); 