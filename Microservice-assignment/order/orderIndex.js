require("dotenv").config();
const eurekaHelper = require("./registry/eurekaHelper.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const orderRoute = require("./routes/orderRoutes.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const port = process.env.PORT || 8081;
app.use("/", orderRoute);
// app.get("/", (req, res) => {
//   res.send("Hello form order-service !");
//   console.log(req.cookie);
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
eurekaHelper.registerWithEureka("order-service", port);
