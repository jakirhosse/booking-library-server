const express = require("express");
const router = express.Router();
const userController = require("../Controllers/adminController");

router.patch("/user/admin/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const result = await userController.makeAdmin(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal admin error" });
  }
});

module.exports = router;
