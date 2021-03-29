const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  postProductReview,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);
router.route("/:id/review").post(protect, postProductReview);

module.exports = router;
