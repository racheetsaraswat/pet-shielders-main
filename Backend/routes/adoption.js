const express = require('express');
const router = express.Router();
const Adoption = require('../models/adoption');
const Pet = require('../models/pet');

// Get all adoption applications (admin only)
router.get('/', async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('petId').sort({ createdAt: -1 });
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new adoption application
router.post('/', async (req, res) => {
  try {
    const adoption = new Adoption(req.body);
    const newAdoption = await adoption.save();
    res.status(201).json(newAdoption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update adoption application status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption application not found' });
    }
    res.json(adoption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get adoption application by ID
router.get('/:id', async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id).populate('petId');
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption application not found' });
    }
    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 