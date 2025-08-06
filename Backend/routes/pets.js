const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');

// Get all pets with optional filtering
router.get('/', async (req, res) => {
  try {
    const { type, breed, age, location, size, gender } = req.query;
    let filter = { isAvailable: true };

    if (type) filter.type = { $regex: type, $options: 'i' };
    if (breed) filter.breed = { $regex: breed, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (size) filter.size = size;
    if (gender) filter.gender = gender;
    if (age) {
      if (age === 'baby') filter.age = { $lt: 1 };
      else if (age === 'young') filter.age = { $gte: 1, $lte: 2 };
      else if (age === 'adult') filter.age = { $gt: 2, $lte: 8 };
      else if (age === 'senior') filter.age = { $gt: 8 };
    }

    const pets = await Pet.find(filter).sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new pet (admin only)
router.post('/', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a pet (admin only)
router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a pet (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 