const express = require("express");
const path = require("path");
const adminController = require("../controllers/admin");
//This is like a mini express app which we can export and use it elsewhere.
const router = express.Router();

//Here the rootDir gives the path name for root structure of this project which is "/Users/vishnu/NodeProj/exercise"
const rootDir = require("../util/path");

router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product/", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
