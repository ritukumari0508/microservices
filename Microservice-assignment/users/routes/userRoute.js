const userController = require("../controller/userController.js");
const express = require("express");
const userRouter = express.Router();
userRouter.get("/", (req, res) => {
  res.send("Hello form users-service!");
});
userRouter.post("/login", userController.userLogin);
userRouter.post("/logout", userController.userLogout);
userRouter.post("/register", userController.userRegister);

module.exports = userRouter;
