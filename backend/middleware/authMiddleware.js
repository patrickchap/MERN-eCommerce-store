const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const asyncHandler = require("express-async-handler");

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.data).select("-password");
      if (req.user.isAdmin) {
        next();
      } else {
        throw new Error("Admin Only");
      }
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error(err.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.data).select("-password");
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { protect, protectAdmin };
