const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogController.js");
const { ObjectId } = require("mongodb");

router.post("/blog", async (req, res) => {
  try {
    const data = req.body;
    await blogController.createBlog(data);
    res.status(200).send({ message: "blog data success" });
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
});

//   get all product data //
router.get("/blog", async (req, res) => {
  try {
    const blogData = await blogController.getBlog();
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send({ error: "internal server error  " });
  }
});

// get single blog data by id
router.get("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const blogData = await blogController.getBlogById(query);
    console.log(blogData);
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send({ error: "internal server error", error });
  }
});

// like user update //////

module.exports = router;
