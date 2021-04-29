const Product = require("../Models/product");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  console.log("getProducts");
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

const createNewProduct = asyncHandler(async (req, res) => {
  let newProduct = {
    user: req.user._id,
    name: "createdName",
    image: "/images/noImage.png",
    category: "createdCategory",
    subcategory: "createdSubcategory",
    description: "createdDescription",
    reviews: [],
  };
  try {
    let product = await Product.create(newProduct);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400);
    res.send("Creation of new product failed");
  }
});

//admin only
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Product.deleteOne({ _id: id });
  if (result.deletedCount === 1) {
    res.json({ msg: "Product Deleted" });
  } else {
    res.json({ msg: "No documents matched the query. Deleted 0 documents." });
  }
});

//put
//admin only
const updateProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.subcategory = req.body.subcategory || product.subcategory;
    product.description = req.body.description || product.description;
  }

  const updateProduct = await product.save();
  res.json({
    name: updateProduct.name,
    price: updateProduct.price,
    countInStock: updateProduct.countInStock,
    image: updateProduct.image,
    category: updateProduct.category,
    subcategory: updateProduct.subcategory,
    description: updateProduct.description,
  });
});

module.exports = {
  getProducts,
  getProductById,
  postProductReview,
  createNewProduct,
  deleteProduct,
  updateProducts,
};
