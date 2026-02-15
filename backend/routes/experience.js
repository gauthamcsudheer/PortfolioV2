const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const protect = require('../middleware/auth');

// GET all milestones (Public)
router.get('/', async (req, res) => {
  try {
    const items = await Experience.find().sort('orderIndex');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new milestone (Protected)
router.post('/', protect, async (req, res) => {
  const item = new Experience(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Reorder items
router.put('/reorder', protect, async (req, res) => {
  const { orders } = req.body;

  try {
    const bulkOps = orders.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { orderIndex: item.index } },
      },
    }));

    await Experience.bulkWrite(bulkOps); 
    res.json({ message: "Timeline hierarchy updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: Update an existing milestone (Protected)
router.put('/:id', protect, async (req, res) => {
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

// DELETE a milestone (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Milestone deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;