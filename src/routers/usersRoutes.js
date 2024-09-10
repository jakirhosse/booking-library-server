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
    return res.status(400).json({ error: "Email parameter is missing" });
  }

  const query = { email };

  try {
    const result = await userController.getSingleUser(query);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
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

// user search on user management route
router.get("/user/:searchText", async (req, res) => {
  const searchText = req.params.searchText;
  try {
    const result = await userController.searchUser(searchText);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "User Search not working", error });
  }
});

// delete user data

router.delete("/user", async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await userController.deleteUser(query);
    res.status(200).send({ message: "user delete successfull", data: result });
  } catch (error) {
    res.status(500).send({ error: "Search not working", error });
  }
});

// check admin by user

router.get("/admin", async (req, res) => {
  try {
    const email = req.query.email;
    // if (req.decoded !== email) {
    //   res.send({ admin: false });
    // }

    const query = { email: email };
    const user = await userController.adminCheck(query);
    const isAdmin = { admin: user?.role == "admin" };
    res.send(isAdmin);
  } catch (error) {
    res.status(500).send({ error: "there was a server side error", error });
  }
});

// admin make user role
router.patch("/makeAdmin", async (req, res) => {
  try {
    const email = req.query.email;
    const makeData = req.body.role;
    const query = { email: email };
    const updateData = {
      $set: {
        role: makeData,
      },
    };
    await userController.makeAdmin(query, updateData);
    res.status(200).send({ message: "Admin Make successfull" });
  } catch (error) {
    res.status(500).send({ error: "Admin Make not working", error });
  }
});
module.exports = router;
