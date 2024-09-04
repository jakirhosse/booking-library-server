const express = require("express");
const router = express.Router();
const learningQuestionsController = require("../Controllers/learingQuestionController");

// Add a new route for POST requests to create a question
router.post("/questions", async (req, res) => {
  try {
    const questionData = req.body;
    await learningQuestionsController.createLearningQuestion(questionData);
    res.status(200).json({
      message: "Question Create Successful",
    });
  } catch (error) {
    console.error("Error creating learning question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all questions
router.get("/questions", async (req, res) => {
  try {
    const allQuestions =
      await learningQuestionsController.getAllLearningQuestions();
    res.status(200).json(allQuestions);
  } catch (error) {
    console.error("Error fetching learning questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
