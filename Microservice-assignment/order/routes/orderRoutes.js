const orderController = require("../controller/orderController.js");
const express = require("express");
const orderRoute = express.Router();

orderRoute.get("/", (req, res) => {
  res.send("Hi from order service !");
});
orderRoute.get("/all-orders", orderController.allOrderByUser);
orderRoute.get("/order/:id", orderController.orderDetail);
orderRoute.post("/create-order", orderController.createOrder);
orderRoute.put("/edit-order/:id", orderController.editOrder);
orderRoute.delete("/delete-order/:id", orderController.deleteOrder);

module.exports = orderRoute;
