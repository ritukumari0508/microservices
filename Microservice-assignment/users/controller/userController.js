require("dotenv").config();
const userCollection = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const sercretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const userLogin = async (req, res) => {
  try {
    if (!req.cookies.adminJwt) {
      const check = await userCollection.findOne({
        username: req.body.username,
        name: req.body.name,
      });
      if (check) {
        const password_valid = await bcrypt.compare(
          req.body.password,
          check.password
        );
        if (password_valid) {
          jwt.sign(
            { check },
            sercretKey,
            { expiresIn: "24h" },
            (err, token) => {
              // console.log("redirected_1");
              // console.log(token);
              res.cookie("jwt", token, {
                maxAge: 24 * 60 * 60 * 1000, // Lifetime
              });
              // console.log("Cookie have been saved successfully");
              res.redirect(`http://localhost:9001/mygateway`);
            }
          );
        }
      } else {
        res.send("Wrong password !");
      }
    } else {
      res.send("You have to logout as a admin first !");
    }
  } catch {
    res.send("Wrong details !");
  }
};

const userLogout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect(`http://localhost:9001/outGateway`);
};

const userRegister = async (req, res) => {
  await bcrypt.hash(req.body.password, 10).then(async (hash) => {
    // console.log(hash);
    const user = {
      name: req.body.name,
      address: req.body.address,
      username: req.body.username,
      password: hash,
    };
    await userCollection.insertMany([user]);
    console.log("user added successfully!");
    res.send("User added successfully");
  });
};

module.exports = {
  userLogin,
  userRegister,
  userLogout,
};
