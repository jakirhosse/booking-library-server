const connectToMongoDB = require("../config/db");

const createBook = async (addBook) => {
  const client = await connectToMongoDB();
  const booksCollection = client.db("LangMaster").collection("books");
  const result = await booksCollection.insertOne(addBook);
  return result;
};

const getAllBooks = async () => {
  const client = await connectToMongoDB();
  const booksCollection = client.db("LangMaster").collection("books");
  const result = await booksCollection.find().toArray();
  return result;
};

const deleteBook = async (query) => {
  const client = await connectToMongoDB();
  const booksCollection = client.db("LangMaster").collection("books");
  const result = await booksCollection.deleteOne(query);
  return result;
};

// get books by user email
// const getUserBooks = async (email) => {
//   const client = await connectToMongoDB();
//   const booksCollection = client.db("LangMaster").collection("bought-books");
//   const query = { email: email };
//   const result = await booksCollection.find(query).toArray();
//   return result;
// };

//post bought books in db
const postBoughtBooks = async (bookInfo) => {
  const client = await connectToMongoDB();
  const booksCollection = client.db("LangMaster").collection("bought-books");
  const result = await booksCollection.insertOne(bookInfo);
  return result;
};
module.exports = {
  createBook,
  getAllBooks,
  deleteBook,
  postBoughtBooks,
};
