import User from "../models/User.js";
import customError from "../utils/customError.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Register user
// @route   GET /api/v1/auth/register
// @access  Public

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new customError("Please provide an email and password", 400));
  }

  // check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new customError("Invalid credentials", 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new customError("Invalid credentials", 401));
  }

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
