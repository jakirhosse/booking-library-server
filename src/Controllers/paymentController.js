const connectToMongoDB = require("../config/db");
const stripe = require("stripe")(process.env.PAYMENT_GATWAY_SECRETKEY);
// Save payment information to the database
const savePaymentInfo = async (paymentInfo) => {
  const client = await connectToMongoDB();
  try {
    const paymentCollection = client.db("LangMaster").collection("payments");
    const result = await paymentCollection.insertOne(paymentInfo);
    return result;
  } catch (error) {
    throw new Error("Error saving payment info to DB: " + error.message);
  } finally {
    await client.close(); // Always close the connection after the operation
  }
};

// Get all payment data from the database
const getPayment = async () => {
  const client = await connectToMongoDB();
  try {
    const paymentCollection = client.db("LangMaster").collection("payments");
    const result = await paymentCollection.find().toArray();
    return result;
  } catch (error) {
    throw new Error("Error retrieving payments: " + error.message);
  } finally {
    await client.close();
  }
};

// Get payment data by email from the database
const getPaymentEmail = async (query) => {
  const client = await connectToMongoDB();
  try {
    const paymentCollection = client.db("LangMaster").collection("payments");
    const result = await paymentCollection.find(query).toArray();
    return result;
  } catch (error) {
    throw new Error("Error retrieving payment by email: " + error.message);
  } finally {
    await client.close();
  }
};

// Delete payment data from the database
const deletePayment = async (query) => {
  const client = await connectToMongoDB();
  try {
    const paymentCollection = client.db("LangMaster").collection("payments");
    const result = await paymentCollection.deleteOne(query);
    return result;
  } catch (error) {
    throw new Error("Error deleting payment: " + error.message);
  } finally {
    await client.close();
  }
};

module.exports = {
  savePaymentInfo,
  getPayment,
  getPaymentEmail,
  deletePayment,
};
