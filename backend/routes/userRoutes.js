const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  postNewUser,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(postNewUser);

module.exports = router;
