const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../config/db");

const makeUser = async (id) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: "user",
    },
  };

  const result = await userCollection.updateOne(filter, updateDoc);
  return result;
};

module.exports = {
  makeUser,
};
