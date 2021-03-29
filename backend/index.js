const express = require("express");
const dotenv = require("dotenv");
const Product = require("./Models/product");
dotenv.config();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running");
});

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);

//for 404 errors - not found
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
