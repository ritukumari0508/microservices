require("dotenv").config();
let fs = require("fs");
var adminList = JSON.parse(
  fs.readFileSync(__dirname + "/adminList.json", "utf8")
);
const adminjwt = require("jsonwebtoken");
const secretKey = process.env.ADMIN_SECRET_KEY;
const adminLogin = (req, res) => {
  try {
    var count = 0;
    if (!req.cookies.jwt) {
      const admin = {
        username: req.body.username,
        password: req.body.password,
      };

      for (i = 0; i < adminList.length - 1; i++) {
        if (
          adminList[i].username === admin.username &&
          adminList[i].password === admin.password
        ) {
          count++;
          break;
        }
      }

      if (count) {
        adminjwt.sign(
          { admin },
          secretKey,
          { expiresIn: "600s" },
          (err, token) => {
            res.cookie("adminJwt", token, {
              maxAge: 600000, // Lifetime
            });
            res.send("You are now logged in as a admin");
            //   console.log(req.cookies.adminjwt`/n`);
          }
        );
      } else if (!count) {
        res.send("Wrong password !");
      } else {
        res.send("You have to logout as user first");
      }
    }
  } catch (err) {
    res.send("Error " + err);
  }
};
const adminLogout = (req, res) => {
  res.clearCookie("adminJwt");
  res.redirect(`http://localhost:9001/outGateway`);
  res.send("Logout successfully !");
};
module.exports = {
  adminLogin,
  adminLogout,
};
