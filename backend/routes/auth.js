const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateProfile,
  allusers,
  getUserDetails,
  updateUser,
  deleteUserDetails,
  deleteOrder,
} = require("../controllers/authController");

const { isAuthenticatedUser, athorizeRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, getUserDetails);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, athorizeRoles("admin"), allusers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, athorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, athorizeRoles("admin"), updateUser);

module.exports = router;
