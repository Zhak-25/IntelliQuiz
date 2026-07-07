// routes/resultRoutes.js

const express = require('express');
const router  = express.Router();
const { submitQuiz, getAllResults, getResultById } = require('../controllers/resultController');

// POST /api/results/submit  — submit quiz answers and get score
router.post('/submit', submitQuiz);

// GET  /api/results         — all previous attempts
router.get('/', getAllResults);

// GET  /api/results/:id     — single result by ID
router.get('/:id', getResultById);

module.exports = router;
