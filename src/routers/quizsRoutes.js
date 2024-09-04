const express = require("express");
const router = express.Router();
const quizsController = require("../Controllers/quizscontroller");

// Get all quizzes
router.get("/quizs", async (req, res) => {
  try {
    const quizsData = await quizsController.getQuizs();
    res.status(200).send(quizsData);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Get specific quiz by ID
router.get("/quizs/:id", async (req, res) => {
  const quizId = req.params.id;
  console.log(quizId);
  try {
    const quiz = await quizsController.getQuizById(quizId);
    console.log(quiz);
    if (!quiz) {
      return res.status(404).send({ error: "Quiz not found" });
    }

    res.status(200).send(quiz);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Create a new quiz
router.post("/quizs", async (req, res) => {
  const data = req.body;
  try {
    await quizsController.createQuize(data);
    res.status(200).send({ message: "Quiz created successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
