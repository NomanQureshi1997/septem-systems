const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies

// In-memory store
const questions = [];
let nextQuestionId = 1;
const questionValidation = require("./question_validator");
const helper = require("./helper");

// GET /questions
app.get("/questions", (req, res) => {
  const difficulty = req.query.difficulty;
  if (difficulty) {
    if (!helper.isValidDifficulty(difficulty.toLowerCase())) {
      return res.status(400).json({ error: "Invalid difficulty level" });
    }
    const filteredQuestions = questions.filter(
      (q) => q.difficulty === difficulty.toLowerCase()
    );
    return res.json(filteredQuestions);
  }
  res.json(questions);
});

// POST /questions
app.post("/questions", (req, res) => {
  const payload = questionValidation.validate(req);

  if (payload["error"]) return res.status(400).json(payload);

  const newQuestion = {
    id: nextQuestionId++,
    question: payload["question"],
    choices: payload["choices"],
    correctAnswer: payload["correctAnswer"],
    difficulty: payload["difficulty"],
  };
  questions.push(newQuestion);
  res.status(201).json(newQuestion);
});

// POST /answers
app.post("/answers", (req, res) => {
  const { questionId, answer } = req.body;

  if (!questionId || !answer) {
    return res
      .status(400)
      .json({ error: "Question ID and answer are required" });
  }

  const question = questions.find((q) => q.id === questionId);
  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  const isCorrect = question.correctAnswer === answer;
  res.json({ correct: isCorrect });
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Quiz game API listening at http://localhost:${port}`);
});
