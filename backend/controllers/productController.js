const Product = require("../Models/product");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find();
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const postProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  let product = await Product.findById(req.params.id);
  if (product) {
    const newReview = {
      name: req.user.name,
      rating,
      comment,
      user: req.user,
    };

    let totalRating = rating;
    let updatedReview = 0;
    product.reviews.forEach((rev) => (totalRating += rev.rating));
    updatedReview = totalRating / (product.reviews.length + 1);

    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;
    product.rating = updatedReview;

    await product.save();

    res.status(201).json({ msg: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

module.exports = { getProducts, getProductById, postProductReview };
