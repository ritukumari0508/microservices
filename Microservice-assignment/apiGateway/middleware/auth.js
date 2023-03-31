const jwt = require("jsonwebtoken");
require("dotenv").config();
var my_token = "";
const checkAuth = (req, res, next) => {
  if (req.headers.cookie) {
    my_token = req.headers.cookie.split("=");
    if (my_token[1] && my_token[1] != "") {
      const verifyUser = jwt.verify(my_token[1], process.env.SECRET_KEY);
      console.log(verifyUser);
      next();
    }
  } else {
    res.setHeader("Content-type", "application/json");
    res.statusCode = 401;
    res.end(
      JSON.stringify({ status: 401, message: "Authentication failure !" })
    );
  }
};
module.exports = checkAuth;
