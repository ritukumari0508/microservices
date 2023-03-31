require("../db/connString.js");
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
});
const collection = new mongoose.model("Collection2", productSchema);

module.exports = collection;
