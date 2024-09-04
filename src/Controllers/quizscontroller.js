const connectToMongoDB = require("../config/db");
const { ObjectId } = require("mongodb"); // Import ObjectId for querying by ID

// Get all quizzes
const getQuizs = async () => {
  const client = await connectToMongoDB();
  const quizsCollection = client.db("LangMaster").collection("quizs");
  const quizs = await quizsCollection.find().toArray();
  return quizs;
};

// Get a specific quiz by ID
const getQuizById = async (id) => {
  const client = await connectToMongoDB();
  const quizsCollection = client.db("LangMaster").collection("quizs");
  const quiz = await quizsCollection.findOne({ _id: new ObjectId(id) });
  return quiz;
};

// Create a new quiz
const createQuize = async (data) => {
  const client = await connectToMongoDB();
  const quizsCollection = client.db("LangMaster").collection("quizs");
  const result = await quizsCollection.insertOne(data);
  return result;
};

module.exports = {
  getQuizs,
  getQuizById,
  createQuize,
};
