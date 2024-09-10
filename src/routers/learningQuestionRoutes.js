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

// unit add api Controller start ----------------------------

router.post("/questions-create", async (res, req) => {
  try {
    const data = req.body;
    await learningQuestionsController.unitAdd(data);
    res.status(200).send({ message: "unit post successfull" });
  } catch (error) {
    console.error("Error fetching learning questions:", error);
    res.status(500).send("Internal Server Error");
  }
});

// unit add api Controller end ----------------------------

// unit fnished api start ----------------------

router.post("/unitfinished/:id", async (req, res) => {
  try {
    const userId = req.params.id; //find user from user collection
    const userQuery = { _id: new ObjectId(userId) };
    const number = req.body.unitNumber;
    console.log("working", number);
    const numberCalculate = parseInt(number) + 1;
    const unitNumber = numberCalculate.toString();
    const restul = await learningQuestionsController.finishedUnit(
      userQuery,
      unitNumber
    );
    console.log(restul);
    res.status(200).send(restul);
  } catch (error) {
    res.status(500).send({
      error: `তোমার ${unitNumber} ইউনিট Unlcok করতে ব্যার্থ হয়েছো । আবার চেষ্টা করুন ধন্যবাদ !`,
    });
  }
});

// get a single unit data ----------------------------------
router.get("/questions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const unit = await learningQuestionsController.singleUnit(query);
    res.status(200).send(unit);
  } catch (error) {
    console.error("Error fetching unit data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// push lesson data inside lesson array ------------------

router.post("/add-lesson/:id", async (req, res) => {
  try {
    const unitId = req.params.id;
    const lessonData = req.body; // Assuming you're sending the lesson data in the request body
    const updatedUnit = await learningQuestionsController.addLesson(
      unitId,
      lessonData
    );
    res.status(200).json(updatedUnit);
  } catch (error) {
    console.error("Error adding lesson:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------- push quize data inside quize array ----------------
// Add a quiz to a lesson
// router.post("/add-quiz/:lessonId", async (req, res) => {
//   try {
//     const lessonId = req.params.lessonId;
//     const quizData = req.body.newQuiz; // Assuming you're sending the quiz data in the request body

//     // Call the function to add the quiz to the lesson
//     const updatedLesson = await learningQuestionsController.addQuiz(lessonId, quizData);

//     res.status(200).json(updatedLesson);
//   } catch (error) {
//     console.error("Error adding quiz:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// unit fnished api end ----------------------

// certificate get system
router.get("/certificate", async (req, res) => {
  const queryParameters = req.query; // Retrieve query parameters from the request
  await learningQuestionsController.certificateController(queryParameters);
  console.log(queryParameters);
});

// add lesson and question dynamically start -----------------------------

router.get("/add-lesson/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const respons = await learningQuestionsController.addLesson(query);
  res.send(respons);
});

// -------------- push quize data inside lesson quize array ----------------

router.get("/addQuize", (req, res) => {
  const data = req.body;
  console.log("working ", data);
});

// add lesson and question dynamically end -------------------------------

module.exports = router;
