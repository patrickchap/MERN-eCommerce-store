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

app.get("/", (req, res) => {
  res.send("Running");
});

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/upload/", uploadRouts);

app.use(express.static("uploads"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use("/uploads", express.static(express.static("/uploads")));
//for 404 errors - not found

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
