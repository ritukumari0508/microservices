const adminController = require("../controller/adminController.js");
const express = require("express");
const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.send("Hi from admin");
});
adminRouter.post("/login", adminController.adminLogin);//
adminRouter.post("/logout", adminController.adminLogout);
module.exports = adminRouter;
