const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Import route modules
const blogRoutes = require("./src/routers/blogRoutes");
const booksRoutes = require("./src/routers/bookRouters");
const JwtRoutes = require("./src/routers/JwtRoute");
const usersRouters = require("./src/routers/usersRoutes");
const feedbackRoutes = require("./src/routers/feedbackRoutes");
const learningQuestionRoutes = require("./src/routers/learningQuestionRoutes");
const quizsRoutes = require("./src/routers/quizsRoutes");

// Middleware setup
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("BookLibrary is Running");
});

// Route definitions
app.use("/blogs", blogRoutes);
app.use("/books", booksRoutes);
app.use("/quizs", quizsRoutes);
app.use("/json-web-token", JwtRoutes);
app.use("/users", usersRouters);
app.use("/learning-questions", learningQuestionRoutes);

// Default error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error (Default)");
});

// Start the server
app.listen(port, () => {
  console.log(`BookLibrary listening on port ${port}`);
});
