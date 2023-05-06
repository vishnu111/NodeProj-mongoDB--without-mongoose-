const express = require("express");
const path = require("path");
const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

//In the express.js, the ":" indicates the dynamic segment at that place, for eg., if the url is "/products/6767" then the productId is 6767
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.post("/create-order", shopController.postOrder);

router.get("/orders", shopController.getOrders);
// router.get("/checkout", shopController.getCheckout);
module.exports = router;
