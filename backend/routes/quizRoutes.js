// routes/quizRoutes.js

const express = require('express');
const router  = express.Router();
const { getAllQuizzes, getQuizQuestions } = require('../controllers/quizController');

// GET /api/quizzes              — all quizzes
router.get('/', getAllQuizzes);

// GET /api/quizzes/:id/questions — questions for a quiz (no correct_answer)
router.get('/:id/questions', getQuizQuestions);

module.exports = router;
