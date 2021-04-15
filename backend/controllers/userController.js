const User = require("../Models/user");
const asyncHandler = require("express-async-handler");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.getUserFromPassword(password))) {
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateJWT(),
    });
  } else {
    res.status(401);
    throw new Error("Invalid User");
  }
});

const postNewUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("Email already exists");
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: newUser.generateJWT(),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
  }
  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: updatedUser.generateJWT(),
  });
});

//admin only
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

//admin only
const changeUserAdminRights = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    user.isAdmin = !user.isAdmin;
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: updatedUser.generateJWT(),
  });
});

//admin only
const deleteUser = asyncHandler(async (req, res) => {
  console.log("deleteUser");
  console.log({ _id: req.body._id });

  const result = await User.deleteOne({ _id: req.body._id });
  if (result.deletedCount === 1) {
    console.log("Deleted");

    res.json({ msg: "User Deleted" });
  } else {
    console.log("Not Deleted");
    res.json({ msg: "No documents matched the query. Deleted 0 documents." });
  }
});

module.exports = {
  authUser,
  getUserProfile,
  postNewUser,
  updateUserProfile,
  getUsers,
  changeUserAdminRights,
  deleteUser,
};
