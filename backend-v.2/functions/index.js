const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
const env = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});
app.use("/products", require("./routes/productsRoutes"));
app.use("/biddings", require("./routes/biddingRoutes"));
app.use("/users", require("./routes/usersRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

app.use(errorHandler);

exports.app = functions.https.onRequest(app);
