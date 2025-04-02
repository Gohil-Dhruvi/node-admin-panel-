const express = require('express');
const routes = express.Router();
const passport = require('passport');
const { 
    dashBoard, loginPage, loginAdmin, logout, 
    forgotPasswordPage, sendEmail, verifyOTP, changePassword, changePasswordPage, resetPassword, profilePage 
} = require("../controller/index.controller");

routes.get("/", loginPage);
routes.get("/dashboard", passport.checkAuthenticated, dashBoard);

routes.post("/login", passport.authenticate('local', { failureRedirect: "/" }), loginAdmin);
routes.get("/logout", logout);
routes.get("/profile", passport.checkAuthenticated, profilePage);  // Added authentication middleware

routes.get("/forgotPassword", forgotPasswordPage);
routes.post("/sendEmail", sendEmail);
routes.post("/verify-otp", verifyOTP);
routes.post("/reset-password", resetPassword);

routes.get("/change-password", passport.checkAuthenticated, changePasswordPage);
routes.post("/change-password", passport.checkAuthenticated, changePassword);

routes.use("/admin", passport.checkAuthenticated, require('./admin.routes'));
routes.use("/blogs", passport.checkAuthenticated, require('./blog.routes'));

module.exports = routes;
