const express = require("express");
const router = express.Router();
const userController = require("../Controllers/makeUserController");

router.patch("/user/makeUser/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await userController.makeUser(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal user error", error });
  }
});
module.exports = router;
