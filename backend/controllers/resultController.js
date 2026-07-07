// controllers/resultController.js
// Business logic for quiz result submission and retrieval

const { pool } = require('../config/db');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/results/submit
// Accepts quiz answers, scores them against DB, stores and returns result
//
// Request body:
// {
//   "quizId": 1,
//   "answers": [
//     { "questionId": 1, "selected": "A" },
//     { "questionId": 2, "selected": "D" }
//   ]
// }
// ─────────────────────────────────────────────────────────────────────────────
const submitQuiz = async (req, res, next) => {
  try {
    const { quizId, answers } = req.body;

    // ── Input validation ────────────────────────────────────────────────────
    if (!quizId || isNaN(parseInt(quizId, 10))) {
      const err = new Error('Missing or invalid "quizId" in request body.');
      err.statusCode = 400;
      return next(err);
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      const err = new Error('"answers" must be a non-empty array.');
      err.statusCode = 400;
      return next(err);
    }

    const validOptions = ['A', 'B', 'C', 'D'];
    for (const ans of answers) {
      if (!ans.questionId || isNaN(parseInt(ans.questionId, 10))) {
        const err = new Error(`Each answer must have a valid "questionId". Got: ${JSON.stringify(ans)}`);
        err.statusCode = 400;
        return next(err);
      }
      if (!ans.selected || !validOptions.includes(ans.selected.toString().toUpperCase())) {
        const err = new Error(`"selected" must be one of A, B, C, D. Got: "${ans.selected}" for questionId ${ans.questionId}`);
        err.statusCode = 400;
        return next(err);
      }
    }

    // ── Verify quiz exists ──────────────────────────────────────────────────
    const [quiz] = await pool.query(
      'SELECT id, title FROM quizzes WHERE id = ?',
      [parseInt(quizId, 10)]
    );

    if (quiz.length === 0) {
      const err = new Error(`Quiz with ID ${quizId} not found.`);
      err.statusCode = 404;
      return next(err);
    }

    // ── Load correct answers from DB ────────────────────────────────────────
    const questionIds = answers.map((a) => parseInt(a.questionId, 10));

    const [correctAnswers] = await pool.query(
      `SELECT id, correct_answer
       FROM questions
       WHERE quiz_id = ? AND id IN (?)`,
      [parseInt(quizId, 10), questionIds]
    );

    if (correctAnswers.length === 0) {
      const err = new Error('No matching questions found for the provided questionIds and quizId.');
      err.statusCode = 404;
      return next(err);
    }

    // Build a lookup map: { questionId -> correct_answer }
    const correctMap = {};
    correctAnswers.forEach((row) => {
      correctMap[row.id] = row.correct_answer.toUpperCase();
    });

    // ── Calculate score ─────────────────────────────────────────────────────
    let score = 0;
    const totalQuestions = correctAnswers.length;

    answers.forEach((ans) => {
      const qId = parseInt(ans.questionId, 10);
      const selected = ans.selected.toString().toUpperCase();
      if (correctMap[qId] && correctMap[qId] === selected) {
        score++;
      }
    });

    const percentage = Math.round((score / totalQuestions) * 100);

    // ── Store result in database ────────────────────────────────────────────
    const [insertResult] = await pool.query(
      `INSERT INTO results (quiz_id, score, total_questions, percentage)
       VALUES (?, ?, ?, ?)`,
      [parseInt(quizId, 10), score, totalQuestions, percentage]
    );

    // ── Return result to frontend ───────────────────────────────────────────
    res.status(201).json({
      success: true,
      result: {
        id:             insertResult.insertId,
        quiz_id:        parseInt(quizId, 10),
        quiz_title:     quiz[0].title,
        score,
        total:          totalQuestions,
        percentage,
        created_at:     new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/results
// Returns all previous quiz attempts, newest first
// ─────────────────────────────────────────────────────────────────────────────
const getAllResults = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT
         r.id,
         r.quiz_id,
         q.course_code,
         q.title AS quiz_title,
         r.score,
         r.total_questions,
         r.percentage,
         r.created_at
       FROM results r
       LEFT JOIN quizzes q ON r.quiz_id = q.id
       ORDER BY r.created_at DESC`
    );

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
// GET /api/results/:id
// Returns a single result by ID
// ─────────────────────────────────────────────────────────────────────────────
const getResultById = async (req, res, next) => {
  try {
    const resultId = parseInt(req.params.id, 10);

    if (isNaN(resultId) || resultId <= 0) {
      const err = new Error('Invalid result ID.');
      err.statusCode = 400;
      return next(err);
    }

    const [rows] = await pool.query(
      `SELECT
         r.id,
         r.quiz_id,
         q.course_code,
         q.title AS quiz_title,
         r.score,
         r.total_questions,
         r.percentage,
         r.created_at
       FROM results r
       LEFT JOIN quizzes q ON r.quiz_id = q.id
       WHERE r.id = ?`,
      [resultId]
    );

    if (rows.length === 0) {
      const err = new Error(`Result with ID ${resultId} not found.`);
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitQuiz, getAllResults, getResultById };
