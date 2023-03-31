require("dotenv").config();
let fs = require("fs");
var adminList = JSON.parse(
  fs.readFileSync(__dirname + "/adminList.json", "utf8")
);
const bodyParser = require("body-parser");
const eurekaHelper = require("./registry/eurekaHelper.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const adminRoute = require("./router/adminRoute.js");
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", adminRoute);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
eurekaHelper.registerWithEureka("admin-service", port);
