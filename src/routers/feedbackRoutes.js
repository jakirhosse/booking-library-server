const express = require("express");
const router = express.Router();
const feedbackController = require("../Controllers/feedbackController");

router.get("/review", async (req, res) => {
  try {
    const result = await feedbackController.getReviews();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal server error", error });
  }
});

module.exports = router;
