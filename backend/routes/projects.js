const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const protect = require('../middleware/auth');

// GET all projects sorted by orderIndex (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort('orderIndex');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new project (Protected)
router.post('/', protect, async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Reorder items
router.put('/reorder', protect, async (req, res) => {
  const { orders } = req.body; // Expects [{ id: "...", index: 0 }, ...]

  try {
    // We use a bulkWrite for maximum efficiency (DSE style!)
    const bulkOps = orders.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { orderIndex: item.index } },
      },
    }));

    await Project.bulkWrite(bulkOps); // Use Experience.bulkWrite for the other file
    res.json({ message: "Hierarchy updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: Update an existing project (Protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a project (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;