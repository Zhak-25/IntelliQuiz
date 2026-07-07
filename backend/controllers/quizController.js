// controllers/quizController.js
// Business logic for quiz-related API endpoints

const { pool } = require('../config/db');

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/quizzes
// Returns all quizzes (id, course_code, title, description, created_at)
// ─────────────────────────────────────────────────────────────────────────────
const getAllQuizzes = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, course_code, title, description, created_at FROM quizzes ORDER BY course_code ASC'
    );

    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No quizzes found. Please run the seed script.',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/quizzes/:id/questions
// Returns all questions for a quiz — WITHOUT correct_answer (security)
// ─────────────────────────────────────────────────────────────────────────────
const getQuizQuestions = async (req, res, next) => {
  try {
    const quizId = parseInt(req.params.id, 10);

    if (isNaN(quizId) || quizId <= 0) {
      const err = new Error('Invalid quiz ID. Must be a positive integer.');
      err.statusCode = 400;
      return next(err);
    }

    // Verify quiz exists
    const [quiz] = await pool.query(
      'SELECT id, course_code, title FROM quizzes WHERE id = ?',
      [quizId]
    );

    if (quiz.length === 0) {
      const err = new Error(`Quiz with ID ${quizId} not found.`);
      err.statusCode = 404;
      return next(err);
    }

    // Fetch questions — deliberately OMIT correct_answer
    const [questions] = await pool.query(
      `SELECT id, question, option_a, option_b, option_c, option_d
       FROM questions
       WHERE quiz_id = ?
       ORDER BY id ASC`,
      [quizId]
    );

    if (questions.length === 0) {
      return res.status(200).json({
        success: true,
        quiz: quiz[0],
        message: 'No questions found for this quiz.',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      quiz: quiz[0],
      count: questions.length,
      data: questions,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllQuizzes, getQuizQuestions };
