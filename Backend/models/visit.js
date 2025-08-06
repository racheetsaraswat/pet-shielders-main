const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  petName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  visitReason: { type: String, required: true },
  additionalNotes: { type: String },
  numberOfVisitors: { type: String, default: "1" },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  confirmedAt: { type: Date },
  confirmedBy: { type: String }
});

module.exports = mongoose.model("Visit", visitSchema); 