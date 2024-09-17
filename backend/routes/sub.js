const express = require('express');
const router = express.Router();
const Submission = require('../models/models');

// Route to get submission count for each lab
router.get('/submission-count', async (req, res) => {
  try {
    const aiCount = await Submission.countDocuments({ lab: 'AI' });
    const vrArCount = await Submission.countDocuments({ lab: 'VR_AR' });
    const humanoidCount = await Submission.countDocuments({ lab: 'Humanoid' });
    const dronesCount = await Submission.countDocuments({ lab: 'Drones' });
    const cyberCount = await Submission.countDocuments({ lab: 'Cyber' });

    res.json({
      AI: aiCount,
      VR_AR: vrArCount,
      Humanoid: humanoidCount,
      Drones: dronesCount,
      Cyber: cyberCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submission counts' });
  }
});

module.exports = router;
