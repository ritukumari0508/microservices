require("dotenv").config();
const jwt = require("jsonwebtoken");
const orderCollection = require("../model/orderModel.js");
const allOrderByUser = async (req, res) => {
  try {
    const verifiedUser = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);
    const userName = verifiedUser.check.name;
    const products = await orderCollection.find({ orderBy: userName });
    res.json(products);
  } catch (err) {
    res.json("Error " + err);
  }
};
const createOrder = async (req, res) => {
  try {
    const verifiedUser = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);
    const userName = verifiedUser.check.name;
    let order_Detail = {
      product_name: req.body.product_name,
      deliveryAddress: req.body.deliveryAddress,
      userMobileNumber: req.body.userMobileNumber,
      productAmount: req.body.productAmount,
      orderBy: userName,
    };
    await orderCollection.insertMany([order_Detail]);
    res.send("order placed successfully");
  } catch (err) {
    res.send("Error " + err);
  }
};

const orderDetail = async (req, res) => {
  try {
    const order_Detail = await orderCollection.findById(req.params.id);
    res.json(order_Detail);
  } catch (err) {
    res.send("Error " + err);
  }
};
const deleteOrder = async (req, res) => {
  try {
    await orderCollection.findByIdAndDelete(req.params.id);
    res.send("Order deleted successfully !");
  } catch (err) {
    res.send("Error " + err);
  }
};
const editOrder = async (req, res) => {
  try {
    let order_Detail = {
      product_name: req.body.product_name,
      deliveryAddress: req.body.deliveryAddress,
      userMobileNumber: req.body.userMobileNumber,
      productAmount: req.body.productAmount,
      //orderBy: userName,
    };
    await orderCollection.findByIdAndUpdate(req.params.id, order_Detail);
    res.send("Order updated successfully!");
  } catch (err) {
    res.send("Error " + err);
  }
};

module.exports = {
  createOrder,
  deleteOrder,
  editOrder,
  orderDetail,
  allOrderByUser,
};
