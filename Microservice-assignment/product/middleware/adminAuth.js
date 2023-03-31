const AdminJwt = require("jsonwebtoken");
require("dotenv").config();
var my_token = "";
const checkAuth = (req, res, next) => {
  if (req.headers.cookie) {
    my_token = req.headers.cookie.split("=");
    if (my_token[1] && my_token[1] != "") {
      const verifyUser = AdminJwt.verify(
        my_token[1],
        process.env.ADMIN_SECRET_KEY
      );
      console.log(verifyUser);
      next();
    }
  } else {
    res.setHeader("Content-type", "application/json");
    res.statusCode = 401;
    res.end(
      JSON.stringify({ status: 401, message: "Admin authentication require !" })
    );
  }
  //   next();
};
module.exports = checkAuth;
