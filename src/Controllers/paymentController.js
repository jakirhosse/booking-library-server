const connectToMongoDB = require("../config/db");
const stripe = require("stripe")(`${process.env.PAYMENT_GATWAY_SECRETKEY}`);

// save payment information to db
const savePaymentInfo = async (paymentInfo) => {
  const client = await connectToMongoDB();
  const paymentCollection = client.db("LangMaster").collection("payments");
  const result = await paymentCollection.insertOne(paymentInfo);
  return result;
};

// Get all Payment data ------------
const getPayment = async () => {
  const client = await connectToMongoDB();
  const paymentCollection = client.db("LangMaster").collection("payments");
  const result = await paymentCollection.find().toArray();
  return result;
};
module.exports = {
  savePaymentInfo,
  getPayment,
};
