require("dotenv").config();
const eurekaHelper = require("./registry/eurekaHelper.js");
const cookieParser = require("cookie-parser");
const gateway = require("fast-gateway");
const port = process.env.PORT;
const checkAuth = require("./middleware/auth.js");
const hostname_1 = process.env.HOSTNAME_1;
const hostname_2 = process.env.HOSTNAME_2;
const hostname_3 = process.env.HOSTNAME_3;
const hostname_4 = process.env.HOSTNAME_4;
const server = gateway({
  routes: [
    {
      prefix: "/api/users",
      target: `http://${hostname_1}:8080/`,
    },
    {
      prefix: "/api/order",
      target: `http://${hostname_2}:8081/`,
      middlewares: [checkAuth],
    },
    {
      prefix: "/api/product",
      target: `http://${hostname_3}:8082/`,
    },
    {
      prefix: "/api/admin",
      target: `http://${hostname_4}:8085/`,
    },
  ],
});
server.use(cookieParser());
server.get("/mygateway", (req, res, next) => {
  res.send("User Login Successfull !");
  // console.log("redirected_2");
  // console.log(req.cookies.jwt);
  next();
});
server.get("/outgateway", checkAuth, (req, res) => {
  try {
    res.send("Logout Successfully!");
    console.log("Logout successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});
server.start(port).then((server) => {
  console.log(`Api Gateaway is running 9000 port`);
});
eurekaHelper.registerWithEureka("gateway-service", port);
