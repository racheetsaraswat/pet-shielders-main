const express = require('express');
const router = express.Router();
const Foster = require('../models/foster');

// Test route to verify foster routes are working
router.get('/test', (req, res) => {
  console.log('Foster test route hit!');
  res.json({ message: 'Foster routes are working!' });
});

// Simple test route without database
router.post('/test', (req, res) => {
  console.log('Foster test POST route hit!');
  res.json({ message: 'Foster POST route is working!', data: req.body });
});

// Get all foster applications (admin only)
router.get('/', async (req, res) => {
  try {
    const fosters = await Foster.find().sort({ createdAt: -1 });
    res.json(fosters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new foster application
router.post('/', async (req, res) => {
  console.log('Foster application received:', req.body);
  try {
    const foster = new Foster(req.body);
    const newFoster = await foster.save();
    console.log('Foster application saved:', newFoster);
    res.status(201).json(newFoster);
  } catch (error) {
    console.error('Error saving foster application:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update foster application status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const foster = await Foster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!foster) {
      return res.status(404).json({ message: 'Foster application not found' });
    }
    res.json(foster);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get foster application by ID
router.get('/:id', async (req, res) => {
  try {
    const foster = await Foster.findById(req.params.id);
    if (!foster) {
      return res.status(404).json({ message: 'Foster application not found' });
    }
    res.json(foster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 