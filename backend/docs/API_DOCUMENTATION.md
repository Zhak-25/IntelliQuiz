# IntelliQuiz API Documentation

> **Base URL:** `http://localhost:5000/api`  
> **Version:** 1.0.0  
> **Content-Type:** `application/json`  
> **Authentication:** None (anonymous)

---

## Table of Contents

1. [Health Check](#health-check)
2. [Quizzes](#quizzes)
   - [GET /quizzes](#get-apiquizzes)
   - [GET /quizzes/:id/questions](#get-apiquizzesidquestions)
3. [Results](#results)
   - [POST /results/submit](#post-apiresultssubmit)
   - [GET /results](#get-apiresults)
   - [GET /results/:id](#get-apiresultsid)
4. [Error Responses](#error-responses)
5. [Testing Instructions](#testing-instructions)

---

## Health Check

### `GET /`

Verifies the API server is running.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "🎓 IntelliQuiz API is running",
  "version": "1.0.0",
  "endpoints": {
    "quizzes": "GET  /api/quizzes",
    "questions": "GET  /api/quizzes/:id/questions",
    "submit": "POST /api/results/submit",
    "results": "GET  /api/results"
  }
}
```

---

## Quizzes

### `GET /api/quizzes`

Returns all available quizzes.

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 9,
  "data": [
    {
      "id": 1,
      "course_code": "CSC301",
      "title": "Object Oriented Programming In JAVA",
      "description": "Covers OOP principles, Java syntax, inheritance, polymorphism, and design patterns.",
      "created_at": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "course_code": "CSC303",
      "title": "Database Design and Management",
      "description": "Covers relational database theory, SQL, normalization, transactions, and DBMS concepts.",
      "created_at": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### `GET /api/quizzes/:id/questions`

Returns all questions for the specified quiz.  
⚠️ **`correct_answer` is intentionally omitted** for security.

**Parameters:**

| Parameter | Type | Description          |
|-----------|------|----------------------|
| `id`      | int  | Quiz ID (required)   |

**Example Request:**
```
GET /api/quizzes/1/questions
```

**Response `200 OK`:**
```json
{
  "success": true,
  "quiz": {
    "id": 1,
    "course_code": "CSC301",
    "title": "Object Oriented Programming In JAVA"
  },
  "count": 20,
  "data": [
    {
      "id": 1,
      "question": "Which keyword is used to inherit a class in Java?",
      "option_a": "implements",
      "option_b": "extends",
      "option_c": "inherits",
      "option_d": "super"
    },
    {
      "id": 2,
      "question": "Which of the following is NOT a feature of OOP?",
      "option_a": "Encapsulation",
      "option_b": "Polymorphism",
      "option_c": "Compilation",
      "option_d": "Inheritance"
    }
  ]
}
```

**Error `404 Not Found`:**
```json
{
  "success": false,
  "error": {
    "message": "Quiz with ID 999 not found."
  }
}
```

---

## Results

### `POST /api/results/submit`

Submits quiz answers, calculates the score, stores the result, and returns it.

**Request Body:**
```json
{
  "quizId": 1,
  "answers": [
    { "questionId": 1, "selected": "B" },
    { "questionId": 2, "selected": "C" },
    { "questionId": 3, "selected": "A" }
  ]
}
```

| Field                     | Type     | Required | Description                           |
|---------------------------|----------|----------|---------------------------------------|
| `quizId`                  | int      | ✅       | ID of the quiz being submitted        |
| `answers`                 | array    | ✅       | Array of answer objects               |
| `answers[].questionId`    | int      | ✅       | ID of the question being answered     |
| `answers[].selected`      | string   | ✅       | Selected option: `"A"`, `"B"`, `"C"`, or `"D"` |

**Response `201 Created`:**
```json
{
  "success": true,
  "result": {
    "id": 1,
    "quiz_id": 1,
    "quiz_title": "Object Oriented Programming In JAVA",
    "score": 18,
    "total": 20,
    "percentage": 90,
    "created_at": "2026-05-01T10:30:00.000Z"
  }
}
```

**Error `400 Bad Request` — Missing quizId:**
```json
{
  "success": false,
  "error": {
    "message": "Missing or invalid \"quizId\" in request body."
  }
}
```

**Error `400 Bad Request` — Invalid selected option:**
```json
{
  "success": false,
  "error": {
    "message": "\"selected\" must be one of A, B, C, D. Got: \"X\" for questionId 2"
  }
}
```

---

### `GET /api/results`

Returns all previous quiz attempts, newest first.

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 3,
      "quiz_id": 2,
      "course_code": "CSC303",
      "quiz_title": "Database Design and Management",
      "score": 16,
      "total_questions": 20,
      "percentage": 80,
      "created_at": "2026-05-15T14:22:00.000Z"
    },
    {
      "id": 2,
      "quiz_id": 1,
      "course_code": "CSC301",
      "quiz_title": "Object Oriented Programming In JAVA",
      "score": 18,
      "total_questions": 20,
      "percentage": 90,
      "created_at": "2026-05-10T09:00:00.000Z"
    }
  ]
}
```

---

### `GET /api/results/:id`

Returns a single result by its ID.

**Example Request:**
```
GET /api/results/1
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "quiz_id": 1,
    "course_code": "CSC301",
    "quiz_title": "Object Oriented Programming In JAVA",
    "score": 18,
    "total_questions": 20,
    "percentage": 90,
    "created_at": "2026-05-01T10:30:00.000Z"
  }
}
```

**Error `404 Not Found`:**
```json
{
  "success": false,
  "error": {
    "message": "Result with ID 999 not found."
  }
}
```

---

## Error Responses

All errors follow this standard format:

```json
{
  "success": false,
  "error": {
    "message": "Human-readable error description"
  }
}
```

| Status Code | Meaning                          |
|-------------|----------------------------------|
| `400`       | Bad Request — invalid input      |
| `404`       | Not Found — resource missing     |
| `409`       | Conflict — duplicate entry       |
| `500`       | Internal Server Error            |
| `503`       | Service Unavailable (DB down)    |

---

## Testing Instructions

### Using a Browser (GET requests only)

1. Open your browser.
2. Navigate to:
   - `http://localhost:5000/` — Health check
   - `http://localhost:5000/api/quizzes` — All quizzes
   - `http://localhost:5000/api/quizzes/1/questions` — Questions for quiz 1
   - `http://localhost:5000/api/results` — All results

### Using Postman

1. Download and open [Postman](https://www.postman.com/downloads/).
2. Create a new collection called **IntelliQuiz**.
3. Test GET endpoints with method `GET`.
4. For `POST /api/results/submit`:
   - Method: `POST`
   - URL: `http://localhost:5000/api/results/submit`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "quizId": 1,
       "answers": [
         {"questionId": 1, "selected": "B"},
         {"questionId": 2, "selected": "C"},
         {"questionId": 3, "selected": "A"}
       ]
     }
     ```

### Using cURL (Terminal)

```bash
# Health check
curl http://localhost:5000/

# Get all quizzes
curl http://localhost:5000/api/quizzes

# Get questions for quiz 1
curl http://localhost:5000/api/quizzes/1/questions

# Submit quiz answers
curl -X POST http://localhost:5000/api/results/submit \
  -H "Content-Type: application/json" \
  -d '{"quizId":1,"answers":[{"questionId":1,"selected":"B"},{"questionId":2,"selected":"C"}]}'

# Get all results
curl http://localhost:5000/api/results
```
