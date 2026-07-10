# IntelliQuiz — Complete XAMPP Setup Guide

Follow every step in order. Do not skip any step.

---

## Prerequisites

- Windows, macOS, or Linux PC
- Internet connection (for downloads)
- VS Code or any text editor

---

## Step 1 — Download and Install XAMPP

1. Go to [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html)
2. Download the version for your operating system (Windows recommended).
3. Run the installer with default settings.
4. Default installation path: `C:\xampp` (Windows)

---

## Step 2 — Start Apache and MySQL in XAMPP

1. Open the **XAMPP Control Panel** (search for it in your Start menu).
2. Click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.
4. Both should show green status lights.

> If a port conflict occurs for Apache (port 80), change it to port 8080 in Apache config — but this does NOT affect MySQL which uses port 3306.

---

## Step 3 — Open phpMyAdmin

1. Open your browser.
2. Go to: `http://localhost/phpmyadmin`
3. You should see the phpMyAdmin dashboard.

---

## Step 4 — Create the Database

**Option A: Using phpMyAdmin (Recommended)**

1. In phpMyAdmin, click **New** in the left sidebar.
2. Enter database name: `intelliquiz`
3. Set collation to: `utf8mb4_unicode_ci`
4. Click **Create**.

**Option B: Using MySQL Command Line**

1. In XAMPP Control Panel, click **Shell** (or open CMD and navigate to `C:\xampp\mysql\bin`).
2. Run:
   ```bash
   mysql -u root -p
   ```
3. Press Enter when asked for password (default is empty).
4. Run:
   ```sql
   CREATE DATABASE intelliquiz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

---

## Step 5 — Import the SQL File

This creates all tables and seeds all 180 questions (9 courses × 20 questions each).

1. In phpMyAdmin, click **intelliquiz** in the left sidebar.
2. Click the **Import** tab at the top.
3. Click **Choose File** and select:
   ```
   backend/sql/database.sql
   ```
4. Leave all settings as default.
5. Scroll down and click **Import**.
6. You should see: ✅ *"Import has been successfully finished."*

**Verify the import:**
- Click on `quizzes` table → should show 9 rows.
- Click on `questions` table → should show 180 rows.
- Click on `results` table → should be empty (that's correct).

---

## Step 6 — Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version.
3. Install with default settings.
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   Both should print version numbers.

---

## Step 7 — Set Up the Backend

1. Open **VS Code** (or your terminal).
2. Navigate into the backend folder:
   ```bash
   cd path/to/backend
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
   This installs: `express`, `mysql2`, `cors`, `dotenv`, `nodemon`.

---

## Step 8 — Create Your `.env` File

1. Inside the `backend/` folder, find the file `.env.example`.
2. Copy it and rename the copy to `.env`:

   **Windows:**
   ```bash
   copy .env.example .env
   ```
   **Mac/Linux:**
   ```bash
   cp .env.example .env
   ```

3. Open `.env` in VS Code. It should look like this:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=intelliquiz
   ```

4. If you set a MySQL root password in XAMPP, enter it after `DB_PASSWORD=`.  
   Default XAMPP has no password — leave it blank.

5. Save the file.

---

## Step 9 — Start the Backend Server

In your terminal (inside the `backend/` folder), run:

```bash
npm run dev
```

You should see:

```
✅  MySQL connected successfully to database: intelliquiz

╔════════════════════════════════════════════╗
║        🎓  IntelliQuiz Backend  🎓         ║
╠════════════════════════════════════════════╣
║  Server running on: http://localhost:5000   ║
║  Environment:       development            ║
╠════════════════════════════════════════════╣
║  GET  /api/quizzes                         ║
║  GET  /api/quizzes/:id/questions           ║
║  POST /api/results/submit                  ║
║  GET  /api/results                         ║
╚════════════════════════════════════════════╝
```

> Keep this terminal open while using IntelliQuiz. The server must be running.

---

## Step 10 — Verify the APIs

Open your browser and test these URLs:

| URL | Expected Result |
|-----|----------------|
| `http://localhost:5000/` | JSON with API info |
| `http://localhost:5000/api/quizzes` | Array of 9 quizzes |
| `http://localhost:5000/api/quizzes/1/questions` | 20 questions for CSC301 |
| `http://localhost:5000/api/results` | Empty array `[]` initially |

If you see JSON responses, your backend is working correctly. ✅

---

## Step 11 — Connect the Frontend

### Option A: Open HTML Files Directly (Quickest)

1. Open `index.html` in your browser (double-click the file).
2. The Fetch API calls will go to `http://localhost:5000/api`.
3. Make sure your backend server is running.

### Option B: Serve via XAMPP Apache (Recommended)

1. Copy your entire `IntelliQuiz/` frontend folder into:
   ```
   C:\xampp\htdocs\intelliquiz\
   ```
2. Open your browser and go to:
   ```
   http://localhost/intelliquiz/index.html
   ```

---

## Troubleshooting

### "Cannot connect to MySQL"
- Make sure MySQL is started in XAMPP Control Panel.
- Verify your `.env` credentials match your MySQL setup.

### "Port 5000 already in use"
- Change `PORT=5000` to `PORT=5001` in `.env`.
- Update `API_BASE` in your frontend JS to match.

### "CORS error" in browser console
- Make sure the backend is running on `http://localhost:5000`.
- The backend has CORS enabled for all origins — this should not happen normally.

### "Quiz questions not loading"
- Check that you ran the SQL file in Step 5.
- Verify `http://localhost:5000/api/quizzes/1/questions` returns data.

### Changes not updating
- `nodemon` auto-restarts on file save. If not, kill the server (`Ctrl+C`) and run `npm run dev` again.

---

## Quick Reference Commands

```bash
# Start the server (development with auto-restart)
npm run dev

# Start the server (production)
npm start

# Install dependencies (first time only)
npm install
```

---

## Folder Structure Summary

```
backend/
├── server.js              ← Entry point
├── package.json           ← Dependencies and scripts
├── .env                   ← Your environment variables (create this)
├── .env.example           ← Template for .env
│
├── config/
│   └── db.js              ← MySQL connection pool
│
├── routes/
│   ├── quizRoutes.js      ← Quiz API routes
│   └── resultRoutes.js    ← Result API routes
│
├── controllers/
│   ├── quizController.js  ← Quiz business logic
│   └── resultController.js← Result business logic
│
├── middleware/
│   └── errorHandler.js    ← Centralized error handling
│
├── sql/
│   └── database.sql       ← ⭐ Run this in phpMyAdmin
│
├── data/
│   └── seedQuestions.js   ← Alternative Node.js seeder
│
└── docs/
    ├── API_DOCUMENTATION.md    ← Full API reference
    └── FRONTEND_INTEGRATION.md ← Frontend JS code
```
