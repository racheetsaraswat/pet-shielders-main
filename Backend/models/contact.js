const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'In Progress', 'Replied', 'Closed'], default: 'New' },
  createdAt: { type: Date, default: Date.now },
  repliedAt: { type: Date }
});

module.exports = mongoose.model("Contact", contactSchema); 