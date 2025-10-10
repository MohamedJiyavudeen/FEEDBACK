const express = require('express');
const Feedback = require('../Feedback'); // make sure path correct

const router = express.Router();

// Admin token middleware
const adminAuth = (req, res, next) => {
  const token = req.headers['authorization'] || req.query.token;
  if (!token || token !== process.env.ADMIN_TOKEN) 
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  next();
};

// paginated list of feedbacks
router.get('/feedbacks', adminAuth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [feedbacks, total] = await Promise.all([
      Feedback.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Feedback.countDocuments()
    ]);

    res.json({ page, limit, total, feedbacks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// analytics endpoint
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const total = await Feedback.countDocuments();
    const avgAgg = await Feedback.aggregate([{ $group: { _id: null, avgRating: { $avg: "$rating" } } }]);
    const avgRating = (avgAgg[0] && avgAgg[0].avgRating) ? Number(avgAgg[0].avgRating.toFixed(2)) : 0;
    const dist = await Feedback.aggregate([
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({ total, avgRating, distribution: dist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
