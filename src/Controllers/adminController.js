const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../config/db");

const makeAdmin = async (id) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const filter = { _id: new ObjectId(id) };
  console.log(filter);

  const updateDoc = {
    $set: {
      role: "admin",
    },
  };

  const result = await userCollection.updateOne(filter, updateDoc);
  return result;
};

module.exports = {
  makeAdmin,
};
