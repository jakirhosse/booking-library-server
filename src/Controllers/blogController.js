const connectToMongoDB = require("../config/db");

const createBlog = async (data) => {
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  const result = blogCollection.insertOne(data);
  return result;
};

// sob gulo data //
const getBlog = async () => {
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  const result = blogCollection.find().toArray();
  return result;
};

//  blog data by id single//
const getBlogById = async (query) => {
  const client = await connectToMongoDB();
  const blogCollection = client.db("LangMaster").collection("blogs");
  const result = await blogCollection.findOne(query);
  return result;
};

module.exports = {
  createBlog,
  getBlog,
  getBlogById,
};
