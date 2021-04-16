const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  postProductReview,
  createNewProduct,
} = require("../controllers/productController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);
router.route("/:id/review").post(protect, postProductReview);
router.route("/create").post(protectAdmin, createNewProduct);

module.exports = router;
