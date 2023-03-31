require("dotenv").config();
const eurekaHelper = require("./registry/eurekaHelper.js");
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute.js");
const app = express();
const port = process.env.PORT;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoute);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
eurekaHelper.registerWithEureka("user-service", port);
