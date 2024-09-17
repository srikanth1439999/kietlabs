const express = require('express');
const router = express.Router();
const Submission = require('../models/models');

// POST route to handle new form submission
router.post('/submit', async (req, res) => {
  const { lab } = req.body;

  // Ensure that no more than 50 submissions are accepted for each lab
  const count = await Submission.countDocuments({ lab });
  if (count >= 50) {
    return res.status(400).json({ error: 'Maximum submissions reached for this lab' });
  }

  const newSubmission = new Submission(req.body);
  try {
    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// GET route to fetch all submissions for a particular lab
router.get('/submissions/:lab', async (req, res) => {
  try {
    const submissions = await Submission.find({ lab: req.params.lab });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});
// GET route to fetch all submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find(); // Fetch all submissions
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});

module.exports = router;
