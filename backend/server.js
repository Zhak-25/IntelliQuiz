// server.js — IntelliQuiz Backend Entry Point

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const { testConnection } = require('./config/db');
const quizRoutes   = require('./routes/quizRoutes');
const resultRoutes = require('./routes/resultRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────

// Enable CORS for all origins (allows your frontend to call this API)
app.use(cors({
  origin: '*',                // In production, restrict to your domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies (for form submissions, if needed)
app.use(express.urlencoded({ extended: true }));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🎓 IntelliQuiz API is running',
    version: '1.0.0',
    endpoints: {
      quizzes:  'GET  /api/quizzes',
      questions:'GET  /api/quizzes/:id/questions',
      submit:   'POST /api/results/submit',
      results:  'GET  /api/results',
    },
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🎓 IntelliQuiz API v1.0.0',
    routes: [
      { method: 'GET',  path: '/api/quizzes',                  description: 'List all quizzes' },
      { method: 'GET',  path: '/api/quizzes/:id/questions',    description: 'Get questions for a quiz' },
      { method: 'POST', path: '/api/results/submit',           description: 'Submit quiz answers' },
      { method: 'GET',  path: '/api/results',                  description: 'Get all quiz results' },
      { method: 'GET',  path: '/api/results/:id',              description: 'Get a single result' },
    ],
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);

// ── 404 Handler (must be after all routes) ────────────────────────────────────
app.use(notFound);

// ── Global Error Handler (must be last) ───────────────────────────────────────
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
const startServer = async () => {
  // Test MySQL connection before accepting requests
  await testConnection();

  app.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════════╗');
    console.log('║        🎓  IntelliQuiz Backend  🎓         ║');
    console.log('╠════════════════════════════════════════════╣');
    console.log(`║  Server running on: http://localhost:${PORT}   ║`);
    console.log(`║  Environment:       ${(process.env.NODE_ENV || 'development').padEnd(24)}║`);
    console.log('╠════════════════════════════════════════════╣');
    console.log(`║  GET  /api/quizzes                         ║`);
    console.log(`║  GET  /api/quizzes/:id/questions           ║`);
    console.log(`║  POST /api/results/submit                  ║`);
    console.log(`║  GET  /api/results                         ║`);
    console.log('╚════════════════════════════════════════════╝');
    console.log('');
  });
};

startServer();
