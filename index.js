const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Correctly require the booksRoutes file
const blogRoutes = require("./src/routers/blogRoutes.js");
const booksRoutes = require("./src/routers/bookRouters.js");
const JwtRoutes = require("./src/routers/JwtRoute");
const usersRouters = require("./src/routers/usersRoutes");
const feedbackRoutes = require("./src/routers/feedbackRoutes.js");
const learningQuestionRoutes = require("./src/routers/learningQuestionRoutes.js");
// Middleware setup
app.use(cors());
app.use(express.json());

// Example root route
app.get("/", (req, res) => {
  res.send("bookLibrary is Running");
});

// review///
app.use("/reviews", feedbackRoutes);

// Use the booksRoutes middleware
app.use("/blogs", blogRoutes);
app.use("/books", booksRoutes);

app.use("/json-web-token", JwtRoutes);
app.use("/users", usersRouters);
app.use("/learning-questions", learningQuestionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error (Default)");
});

// Start the server
app.listen(port, () => {
  console.log(`BookLibrary listening on port ${port}`);
});
