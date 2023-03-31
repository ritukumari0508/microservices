require("dotenv").config();
const eurekaHelper = require("./registry/eurekaHelper.js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
// const cookieParser = require("cookie-parser");
const productRoute = require("./routes/productRoute.js");
const app = express();
const port = process.env.PORT;
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", productRoute);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
eurekaHelper.registerWithEureka("product-service", port);
