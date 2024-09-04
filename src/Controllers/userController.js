const connectToMongoDB = require("../config/db");

// post operation user

const createUser = async (userData, query) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const existingUser = await userCollection.findOne(query);
  if (existingUser) {
    return rs.send({ message: "user already exits" });
  }
  // store user data ////
  const result = await userCollection.insertOne(userData);
  return result;
};

// get operation user
const getUser = async () => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const result = await userCollection.find().toArray();
  return result;
};

// single user get

const getSingleUser = async (query) => {
  let client;

  try {
    client = await connectToMongoDB();
    const userCollection = client.db("LangMaster").collection("users");
    const userData = await userCollection.findOne(query);

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // throwing the error for further handling
  } finally {
    if (client) {
      await client.close();
    }
  }
};
// update user profile data
const updateUser = async (userEmail, updatedData) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const updateUser = await userCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        name: updatedData.name,
        bio: updatedData.bio,
        birthday: updatedData.birthday,
        address: updatedData.address,
        phoneNumber: updatedData.phoneNumber,
        gender: updatedData.gender,
        image: updatedData.image,
      },
    }
  );
  return updateUser;
};

//update user with learning point result
const updateUserPoints = async (userEmail, score) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const updateResult = await userCollection.updateOne(
    { email: userEmail },
    {
      $inc: {
        score: score,
      },
    }
  );

  return updateResult;
};

module.exports = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  updateUserPoints,
};
