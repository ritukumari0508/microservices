require("../db/connString.js");
const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  userMobileNumber: {
    type: String,
    required: true,
  },
  productAmount: {
    type: String,
    required: true,
  },
  orderBy: {
    type: String,
    required: true,
  },
});
const collection = new mongoose.model("Collection3", orderSchema);

module.exports = collection;
