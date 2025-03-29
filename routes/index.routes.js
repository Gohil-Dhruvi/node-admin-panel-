const express = require('express');
const routes = express.Router();
const {dashBoard, loginPage, loginAdmin, profilePage,logout, forgotPasswordPage, sendEmail, verifyOTP, changePassword} = require("../controller/index.controller");

routes.get("/", loginPage);
routes.get("/dashboard", dashBoard);

routes.post("/login", loginAdmin);
routes.get("/logout", logout);
routes.get("/profile", profilePage);

routes.get("/forgotPassword", forgotPasswordPage);
routes.post("/sendEmail", sendEmail);
routes.post("/verify-otp", verifyOTP);
routes.post("/change-password", changePassword);

routes.use("/admin", require('./admin.routes'))


module.exports = routes;