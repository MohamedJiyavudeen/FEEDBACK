// routes/feedback.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Feedback = require('../Feedback');
console.log("feedback.js file start loading...");
console.log("Feedback model loaded successfully");
const router = express.Router();

router.post('/feedback',
  [
    body('name').optional().trim().escape(),
    body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
    body('message').isLength({ min: 3 }).trim().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, rating, message } = req.body;
      const fb = new Feedback({ name, email, rating, message });
      await fb.save();
      res.status(201).json({ message: 'Feedback received. Thank you!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not save feedback' });
    }
  }
);

module.exports = router;
