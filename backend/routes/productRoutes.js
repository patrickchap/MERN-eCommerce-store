const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  postProductReview,
  createNewProduct,
  deleteProduct,
  updateProducts,
} = require("../controllers/productController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/:id/review").post(protect, postProductReview);
router.route("/create").post(protectAdmin, createNewProduct);
//deleteProduct
router.route("/delete/:id").delete(protectAdmin, deleteProduct);
router.route("/update/:id").put(protectAdmin, updateProducts);

module.exports = router;
