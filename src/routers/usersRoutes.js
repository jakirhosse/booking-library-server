const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// user create post oparetion///

router.post("/user", async (req, res) => {
  try {
    const userData = req.body;
    const query = { email: userData.email };
    await userController.createUser(userData, query);
    res.status(200).send({ message: "Acount create successfull" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// user get

router.get("/user", async (req, res) => {
  try {
    const result = await userController.getUser();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});

// get single user

router.get("/singleUser", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send({ error: "Email parameter is missing" });
  }

  const query = { email: email };

  try {
    const result = await userController.getSingleUser(query);
    if (!result) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});

//update user learning points

router.patch("/user/:email", async (req, res) => {
  const userEmail = req.params.email;
  const score = req.body.score;
  try {
    const result = await userController.updateUserPoints(userEmail, score);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});

// update user profile data
router.patch("/update-user/:email", async (req, res) => {
  const userEmail = req.params.email;
  const updatedData = req.body.updatedData;
  console.log("updated data", updatedData);
  try {
    const result = await userController.updateUser(userEmail, updatedData);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});
module.exports = router;
