const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, athorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").post(isAuthenticatedUser, getSingleOrder);
router.route("/order/me").post(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders/")
  .get(isAuthenticatedUser, athorizeRoles("admin"), allOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, athorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, athorizeRoles("admin"), deleteOrder);

module.exports = router;
