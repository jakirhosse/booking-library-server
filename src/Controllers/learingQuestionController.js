const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../config/db");
//  gate all question

const getAllLearningQuestions = async () => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const allQuestions = await learningQuestionsCollection.find().toArray();
  return allQuestions;
};

// Function to create a new learning question
const createLearningQuestion = async (questionData) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");

  // Insert the new question into the database
  const result = await learningQuestionsCollection.insertOne(questionData);
  // Return the newly created question
  return result;
};

module.exports = {
  createLearningQuestion,
  getAllLearningQuestions,
};
