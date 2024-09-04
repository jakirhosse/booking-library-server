const connectToMongoDB = require("../config/db");

// Get all questions
const getAllLearningQuestions = async () => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const allQuestions = await learningQuestionsCollection.find().toArray();
  return allQuestions;
};

// Create a new question
const createLearningQuestion = async (questionData) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const result = await learningQuestionsCollection.insertOne(questionData);
  return result;
};

module.exports = {
  createLearningQuestion,
  getAllLearningQuestions,
};
