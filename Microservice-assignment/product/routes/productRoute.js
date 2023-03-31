const productController = require("../controller/productController.js");
const express = require("express");
const productRoute = express.Router();
const adminAuth = require("../middleware/adminAuth.js");
productRoute.get("/", (req, res) => {
  res.send("Hello form Product-service!");
});
productRoute.get("/all-products", productController.allProductDetails);
productRoute.get("/productDetail/:id", productController.productDetail);
productRoute.post("/add-product", adminAuth, productController.addProduct);
productRoute.put("/:id", adminAuth, productController.editProduct);
productRoute.delete("/:id", adminAuth, productController.deleteProduct);

module.exports = productRoute;
