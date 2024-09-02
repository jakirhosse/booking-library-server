const express = require("express");
const router = express.Router();
const bookController = require("../Controllers/bookController");
const { ObjectId } = require("mongodb");

router.post("/addBook", async (req, res) => {
  const addBook = req.body;
  try {
    await bookController.createBook(addBook);
    res.status(200).send({ Message: "book post successful" });
  } catch (error) {
    res.status(500).send({ error: "interal server error" });
  }
});

// getting all books
router.get("/book", async (req, res) => {
  try {
    const result = await bookController.getAllBooks();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "error getting all books", error });
  }
});

router.delete("/deleteBook/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const deleteBook = await bookController.deleteBook(query);
    res.status(200).send({ message: "Book deleted", data: deleteBook });
  } catch (error) {
    res.status(500).send({ error: "Book Internal Server Error" });
  }
});

// post bought books on db
router.post("/bought-book", async (req, res) => {
  const bookInfo = req.body.bookInfo;
  try {
    const result = await bookController.postBoughtBooks(bookInfo);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "error posting bought books", error });
  }
});
module.exports = router;
