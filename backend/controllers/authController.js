const User = require("../models/user");
const express = require("express");
const ErrorHandler = require("../utils/errorhandler");

const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/kccvibsuiusmwfepb3m.png",
      url:
        "http://res.cloudinary.com/shopit/imgae/upload/v1606305757/avatars/kccvibsuiusmwfepb3m.png",
    },
  });
  sendToken(user, 200, res);
});

//Login user => /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  //Finding user in DB
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  //check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

//get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//Update / user profile => /api/v1/me/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  //update avatar : ToDo
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//Lotgout user => /api/v1/logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

//Admin Routes
//Get all useres => /api/v1/admin/users

exports.allusers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with if: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  //update avatar : ToDo
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//delete user info
exports.deleteUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with if: ${req.params.id}`)
    );
  }
  //remove avatar from clounary
  await user.remove();
  res.status(200).json({
    success: true,
    user,
  });
});
