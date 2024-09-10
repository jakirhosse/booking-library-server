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

// unit add api Controller start ----------------------------

const unitAdd = async (data) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const result = await learningQuestionsCollection.insertOne(data);
  return result;
};

// unit add api Contoller end -------------------------------

// finished unit api  start ----------------------------------------

const finishedUnit = async (userQuery, unitNumber) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  // Check if the unitNumber is already in the unit array
  const userFind = await userCollection.findOne(userQuery);
  if (userFind && userFind.unit.includes(unitNumber)) {
    const Message = { message: "তুমি এই Unit এর আগে একবার শেষ করেছো ।" };
    return Message;
  }
  // If the unitNumber is not in the array, push it
  await userCollection.updateOne(userQuery, {
    $push: { unit: unitNumber },
  });
  return {
    message: `তোমার ${unitNumber} ইউনিট Unlcok করা হয়েছে। Next Button ক্লিক করে পয়েন্ট সংগ্রহ করুন ধন্যবাদ ! `,
  };
};
// finished unit api end ----------------------------------------

// get a single unit data ----------------------------------
const singleUnit = async (unitId) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");
  const result = await learningQuestionsCollection.findOne(unitId);
  return result;
};

// push lesson data inside lesson array ------------------

const addLesson = async (unitId, lessonData) => {
  const client = await connectToMongoDB();
  const learningQuestionsCollection = client
    .db("LangMaster")
    .collection("questions");

  const result = await learningQuestionsCollection.updateOne(
    { _id: new ObjectId(unitId) },
    { $push: { lessons: lessonData } }
  );

  return result;
};

// -------------- push quize data inside lesson quize array ----------------
// Add a quiz to a lesson
// const addQuiz = async (lessonId, quizData) => {
//   const client = await connectToMongoDB();
//   const learningQuestionsCollection = client.db("LangMaster").collection("questions");

//   const result = await learningQuestionsCollection.updateOne(
//     { "lessons._id": new ObjectId(lessonId) }, // Find the lesson using its _id
//     { $push: { "lessons.$.quiz": quizData } } // Push the new quiz into the lesson's quiz array
//   );

//   return result;
// };

module.exports = {
  createLearningQuestion,
  getAllLearningQuestions,
  unitAdd,
  finishedUnit,
  singleUnit,
  addLesson,
};
