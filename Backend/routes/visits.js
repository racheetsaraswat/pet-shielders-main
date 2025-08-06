const express = require('express');
const router = express.Router();
const Visit = require('../models/visit');
const Pet = require('../models/pet');

// Get all visit requests (admin only)
router.get('/', async (req, res) => {
  try {
    const visits = await Visit.find().populate('petId').sort({ createdAt: -1 });
    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new visit request
router.post('/', async (req, res) => {
  try {
    const visit = new Visit(req.body);
    const newVisit = await visit.save();
    res.status(201).json(newVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update visit request status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!visit) {
      return res.status(404).json({ message: 'Visit request not found' });
    }
    res.json(visit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get visit request by ID
router.get('/:id', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id).populate('petId');
    if (!visit) {
      return res.status(404).json({ message: 'Visit request not found' });
    }
    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 