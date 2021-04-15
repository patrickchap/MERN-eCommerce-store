const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  postNewUser,
  updateUserProfile,
  getUsers,
  changeUserAdminRights,
  deleteUser,
} = require("../controllers/userController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");

router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/").post(postNewUser).get(protectAdmin, getUsers);
router.route("/makeAdmin").put(protectAdmin, changeUserAdminRights);
router.route("/delete").delete(protectAdmin, deleteUser);

module.exports = router;
