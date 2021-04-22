const express = require("express");
const dotenv = require("dotenv");
const Product = require("./Models/product");
dotenv.config();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRouts = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
connectDB();
const app = express();
app.use(express.json());

const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 2000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Running");
});

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/upload/", uploadRouts);
app.use("/uploads", express.static(path.resolve() + "/uploads"));
//for 404 errors - not found
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
