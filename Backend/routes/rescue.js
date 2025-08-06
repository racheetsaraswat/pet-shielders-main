const express = require('express');
const router = express.Router();
const Rescue = require('../models/rescue');

// Get all rescue requests (admin only)
router.get('/', async (req, res) => {
  try {
    const rescues = await Rescue.find().sort({ createdAt: -1 });
    res.json(rescues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new rescue request
router.post('/', async (req, res) => {
  try {
    const rescue = new Rescue(req.body);
    const newRescue = await rescue.save();
    res.status(201).json(newRescue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update rescue request status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const rescue = await Rescue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rescue) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }
    res.json(rescue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get rescue request by ID
router.get('/:id', async (req, res) => {
  try {
    const rescue = await Rescue.findById(req.params.id);
    if (!rescue) {
      return res.status(404).json({ message: 'Rescue request not found' });
    }
    res.json(rescue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 