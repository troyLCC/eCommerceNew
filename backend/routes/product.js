const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");

const { isAuthenticatedUser, athorizeRoles } = require("../middlewares/auth");

// router
//   .route("/products")
//   .get(isAuthenticatedUser, athorizeRoles("admin"), getProducts);

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, athorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, athorizeRoles("admin"), deleteProduct);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, athorizeRoles("admin"), newProduct);
router.route("/product/new").post(newProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/review").get(isAuthenticatedUser, getProductReviews);
router.route("/review").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
