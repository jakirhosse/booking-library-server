const express = require("express");
// const nodemailer = require("nodemailer");
const router = express.Router();
const stripe = require("stripe")(process.env.PAYMENT_GATWAY_SECRETKEY);

const paymentController = require("../Controllers/paymentController");
const { ObjectId } = require("mongodb");

// generate payment secret
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { price } = req.body;
    if (price) {
      const amount = parseFloat(price) * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    } else {
      res.status(400).send({ message: "Price is required" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error creating payment intent", error });
  }
});

// save payment info to db
router.post("/payment-info", async (req, res) => {
  try {
    const paymentInfo = req.body.paymentInfo;
    const result = await paymentController.savePaymentInfo(paymentInfo);

    // Send confirmation email (assuming sendMail is defined)
    await sendMail(
      {
        subject: "Payment Successful",
        desc: `Payment Id: ${result?.insertedId}, Transaction Id: ${paymentInfo.transactionId}`,
      },
      paymentInfo?.email
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error on storing data", error });
  }
});

// Get all payments data
router.get("/payment", async (req, res) => {
  try {
    const paymentData = await paymentController.getPayment();
    res.status(200).send(paymentData);
  } catch (error) {
    res.status(500).send({ error: "Internal server error", details: error });
  }
});

// Get single payment data by email
router.get("/paymentUser", async (req, res) => {
  try {
    const { email } = req.query;
    const query = { email };
    const paymentData = await paymentController.getPaymentEmail(query);
    res.status(200).send(paymentData);
  } catch (error) {
    res.status(500).send({ error: "Internal server error", details: error });
  }
});

// delete payment
router.delete("/payment/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const paymentDelete = await paymentController.deletePayment(query);
    res.status(200).send({ message: "Payment deleted", data: paymentDelete });
  } catch (error) {
    res.status(500).send({ error: "Payment Internal Server Error" });
  }
});

module.exports = router;
