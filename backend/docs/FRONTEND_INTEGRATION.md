# IntelliQuiz — Frontend Integration Guide

> **API Base URL:** `http://localhost:5000/api`  
> All code below uses the native **Fetch API** — no libraries needed.

---

## Overview

Your frontend makes three types of API calls:

| Page          | Action              | Endpoint                          |
|---------------|---------------------|-----------------------------------|
| `index.html`  | Load quiz list      | `GET /api/quizzes`                |
| `quiz.html`   | Load questions      | `GET /api/quizzes/:id/questions`  |
| `quiz.html`   | Submit answers      | `POST /api/results/submit`        |
| `result.html` | Display score       | (data passed via localStorage)    |

---

## 1. Load All Quizzes (`index.html`)

Paste this into a `<script>` tag on `index.html`.  
It loads all quizzes from the API and makes each category card clickable.

```javascript
// ─── index.html — Load and display quizzes ────────────────────────────────

const API_BASE = 'http://localhost:5000/api';

async function loadQuizzes() {
  try {
    const response = await fetch(`${API_BASE}/quizzes`);
    const data = await response.json();

    if (!data.success) {
      console.error('Failed to load quizzes:', data.error);
      return;
    }

    const quizzes = data.data; // Array of quiz objects

    // Map course_code to the category cards already in your HTML
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach((card) => {
      const courseCode = card.querySelector('h3').textContent.replace(/\s/g, '');
      // Find matching quiz
      const quiz = quizzes.find(
        (q) => q.course_code === courseCode || q.course_code === courseCode.replace('CSC', 'CSC')
      );

      if (quiz) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          // Store selected quiz in localStorage
          localStorage.setItem('selectedQuizId', quiz.id);
          localStorage.setItem('selectedQuizTitle', quiz.title);
          localStorage.setItem('selectedCourseCode', quiz.course_code);
          // Navigate to quiz page
          window.location.href = 'quiz.html';
        });
      }
    });

    console.log(`✅ Loaded ${quizzes.length} quizzes`);
  } catch (error) {
    console.error('❌ Error loading quizzes:', error.message);
    alert('Could not connect to the server. Make sure the backend is running on port 5000.');
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadQuizzes);
```

---

## 2. Load Questions and Run Quiz (`quiz.html`)

Paste this into a `<script>` tag on `quiz.html`.  
It handles: loading questions, tracking answers, timer, progress bar, and navigation.

```javascript
// ─── quiz.html — Full quiz logic ─────────────────────────────────────────────

const API_BASE = 'http://localhost:5000/api';

// State
let questions = [];
let currentIndex = 0;
let selectedAnswers = {}; // { questionId: 'A' | 'B' | 'C' | 'D' }
let score = 0;
let timerInterval = null;
let timeLeft = 300; // 5 minutes in seconds

// Get quiz info from localStorage (set on index.html)
const quizId    = localStorage.getItem('selectedQuizId');
const quizTitle = localStorage.getItem('selectedQuizTitle');

// ─── Load Questions from API ──────────────────────────────────────────────────
async function loadQuestions() {
  if (!quizId) {
    alert('No quiz selected. Please go back to the home page and choose a quiz.');
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/quizzes/${quizId}/questions`);
    const data = await response.json();

    if (!data.success || data.data.length === 0) {
      alert('No questions found for this quiz. Please contact support.');
      return;
    }

    questions = data.data;

    // Update quiz title
    const titleEl = document.querySelector('.quiz-header h1');
    if (titleEl) titleEl.textContent = quizTitle || 'IntelliQuiz';

    // Render first question
    renderQuestion();
    startTimer();
  } catch (error) {
    console.error('❌ Error loading questions:', error.message);
    alert('Could not load questions. Make sure the backend server is running.');
  }
}

// ─── Render Current Question ──────────────────────────────────────────────────
function renderQuestion() {
  const q = questions[currentIndex];

  // Question text
  document.querySelector('.question-box h2').textContent = q.question;

  // Options
  const optionBtns = document.querySelectorAll('.option-btn');
  const options = [q.option_a, q.option_b, q.option_c, q.option_d];
  const labels  = ['A', 'B', 'C', 'D'];

  optionBtns.forEach((btn, i) => {
    btn.textContent = `${labels[i]}. ${options[i]}`;
    btn.className = 'option-btn';

    // Restore selection if revisiting
    if (selectedAnswers[q.id] === labels[i]) {
      btn.classList.add('selected');
      btn.style.background = '#dbeafe';
      btn.style.borderColor = 'var(--primary-color)';
    }

    btn.onclick = () => selectOption(labels[i], btn);
  });

  // Progress bar
  const progressEl = document.querySelector('.progress');
  const pct = ((currentIndex + 1) / questions.length) * 100;
  if (progressEl) progressEl.style.width = `${pct}%`;

  // Question counter
  const infoEl = document.querySelector('.quiz-info p:first-child');
  if (infoEl) infoEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

  // Score display
  const scoreEl = document.querySelector('.score-area');
  if (scoreEl) scoreEl.textContent = `Current Score: ${score}`;
}

// ─── Handle Option Selection ──────────────────────────────────────────────────
function selectOption(label, clickedBtn) {
  const q = questions[currentIndex];

  // Clear previous selections visually
  document.querySelectorAll('.option-btn').forEach((btn) => {
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.className = 'option-btn';
  });

  // Highlight selected
  clickedBtn.classList.add('selected');
  clickedBtn.style.background = '#dbeafe';
  clickedBtn.style.borderColor = 'var(--primary-color)';

  // Store answer
  selectedAnswers[q.id] = label;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    // Last question — submit
    submitQuiz();
  }
}

function previousQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

// ─── Timer ────────────────────────────────────────────────────────────────────
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');

    const timerEl = document.querySelector('.quiz-info p:last-child');
    if (timerEl) timerEl.textContent = `Time Left: ${mins}:${secs}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time is up! Submitting your quiz.');
      submitQuiz();
    }
  }, 1000);
}

// ─── Submit Quiz to API ───────────────────────────────────────────────────────
async function submitQuiz() {
  clearInterval(timerInterval);

  // Build answers array
  const answers = Object.entries(selectedAnswers).map(([questionId, selected]) => ({
    questionId: parseInt(questionId, 10),
    selected,
  }));

  if (answers.length === 0) {
    alert('You have not answered any questions. Please answer at least one question before submitting.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/results/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId: parseInt(quizId, 10), answers }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(`Submission failed: ${data.error.message}`);
      return;
    }

    // Store result for result.html
    localStorage.setItem('quizResult', JSON.stringify(data.result));

    // Navigate to results page
    window.location.href = 'result.html';
  } catch (error) {
    console.error('❌ Error submitting quiz:', error.message);
    alert('Could not submit quiz. Make sure the backend server is running.');
  }
}

// ─── Attach Navigation Button Handlers ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();

  const buttons = document.querySelectorAll('.quiz-buttons button');
  if (buttons[0]) buttons[0].addEventListener('click', previousQuestion); // Previous
  if (buttons[1]) buttons[1].addEventListener('click', nextQuestion);     // Next / Submit

  // Update Next button label on last question
  const observer = new MutationObserver(() => {
    if (questions.length > 0 && currentIndex === questions.length - 1) {
      if (buttons[1]) buttons[1].textContent = 'Submit Quiz';
    } else {
      if (buttons[1]) buttons[1].textContent = 'Next Question';
    }
  });
  observer.observe(document.body, { subtree: true, childList: true });
});
```

---

## 3. Display Score on Result Page (`result.html`)

Paste this into a `<script>` tag on `result.html`.

```javascript
// ─── result.html — Display quiz result ───────────────────────────────────────

function getPerformanceLabel(percentage) {
  if (percentage >= 90) return 'Excellent Performance! 🎉';
  if (percentage >= 75) return 'Great Job! 👏';
  if (percentage >= 50) return 'Good Effort! Keep Practising 💪';
  return 'Needs Improvement — Try Again! 📚';
}

function displayResult() {
  const resultData = localStorage.getItem('quizResult');

  if (!resultData) {
    // No result found — redirect home
    window.location.href = 'index.html';
    return;
  }

  const result = JSON.parse(resultData);

  // Update score circle
  const scoreCircle = document.querySelector('.score-circle');
  if (scoreCircle) scoreCircle.textContent = `${result.percentage}%`;

  // Update performance label
  const performanceEl = document.querySelector('.performance');
  if (performanceEl) performanceEl.textContent = getPerformanceLabel(result.percentage);

  // Update summary text
  const summaryEl = document.querySelector('.summary');
  if (summaryEl) {
    summaryEl.textContent =
      `You answered ${result.score} out of ${result.total} questions correctly.`;
  }

  // Update analysis cards
  const analysisCards = document.querySelectorAll('.analysis-card');
  if (analysisCards[0]) {
    analysisCards[0].querySelector('h3').textContent = 'Quiz';
    analysisCards[0].querySelector('p').textContent = result.quiz_title || 'IntelliQuiz';
  }
  if (analysisCards[1]) {
    analysisCards[1].querySelector('h3').textContent = 'Score';
    analysisCards[1].querySelector('p').textContent = `${result.score} / ${result.total}`;
  }

  // Clear result from localStorage after displaying
  // (comment out if you want to keep it for session)
  // localStorage.removeItem('quizResult');
}

document.addEventListener('DOMContentLoaded', displayResult);
```

---

## 4. How to Add the Scripts to Your HTML Files

### `index.html`

Add just before `</body>`:
```html
<script src="js/index.js"></script>
```
Or inline between `<script>` tags.

### `quiz.html`

Add just before `</body>`:
```html
<script src="js/quiz.js"></script>
```

### `result.html`

Add just before `</body>`:
```html
<script src="js/result.js"></script>
```

---

## 5. Quick Test Checklist

- [ ] Backend is running: `http://localhost:5000` returns JSON
- [ ] `GET /api/quizzes` returns 9 quizzes
- [ ] `GET /api/quizzes/1/questions` returns 20 questions WITHOUT `correct_answer`
- [ ] Clicking a category card on `index.html` goes to `quiz.html`
- [ ] Questions load on `quiz.html`
- [ ] Timer counts down
- [ ] Submitting goes to `result.html` with correct score
- [ ] `result.html` displays percentage and summary

---

## 6. CORS Note

The backend is configured to accept requests from **any origin** (`*`).  
If you run your frontend from a local file (`file:///`) instead of a server, Fetch should still work.  
If you see CORS errors, make sure the backend `server.js` CORS config includes your frontend's origin.
