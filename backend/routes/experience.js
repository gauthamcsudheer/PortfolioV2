const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// GET all sorted by orderIndex
router.get('/', async (req, res) => {
  try {
    const items = await Experience.find().sort('orderIndex');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new item (Work or Education)
router.post('/', async (req, res) => {
  const item = new Experience(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update an existing milestone
router.put('/:id', async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a milestone
router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Milestone deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;