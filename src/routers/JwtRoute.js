const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// ganarate  json web token//

router.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res.status(200).send({ token });
});
module.exports = router;
