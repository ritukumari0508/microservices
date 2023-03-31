require("dotenv").config();
const productCollection = require("../model/productModel.js");
// const jwt = require("jsonwebtoken");
// const adminSecretKey = process.env.ADMIN_SECRET_KEY;
// const bcrypt = require("bcrypt");

const allProductDetails = async (req, res) => {
  try {
    const products = await productCollection.find();
    res.json(products);
  } catch (err) {
    res.json("Error " + err);
  }
};

const addProduct = async (req, res) => {
  try {
    let productDetail = {
      product_name: req.body.product_name,
      description: req.body.description,
      comment: req.body.comment,
      rating: req.body.rating,
    };
    await productCollection.insertMany([productDetail]);
    // console.log(productDetail);
    res.send("Product added successfully");
  } catch (err) {
    res.send("Error " + err);
  }
};
const deleteProduct = async (req, res) => {
  try {
    await productCollection.findByIdAndDelete(req.params.id);
    res.send("Product deleted successfully !");
  } catch (err) {
    res.send("Error " + err);
  }
};
const productDetail = async (req, res) => {
  try {
    const product = await productCollection.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.send("Error " + err);
  }
};

const editProduct = async (req, res) => {
  try {
    let productDetail = {
      product_name: req.body.product_name,
      description: req.body.description,
      comment: req.body.comment,
      rating: req.body.rating,
    };
    await productCollection.findByIdAndUpdate(req.params.id, productDetail);
    res.send("product updated successfully!");
  } catch (err) {
    res.send("Error " + err);
  }
};

module.exports = {
  addProduct,
  productDetail,
  allProductDetails,
  deleteProduct,
  editProduct,
};
