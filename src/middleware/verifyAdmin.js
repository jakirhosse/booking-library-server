const connectToMongoDB = require("../config/db");
const verifyAdmin = async (req, res, next) => {
  const client = await connectToMongoDB();
  const userCollection = client.db("LangMaster").collection("users");
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (user.status !== "admin") {
    return res.status(403).send({ error: true, message: "forbidden message" });
  }
  next();
};

module.exports = verifyAdmin;
