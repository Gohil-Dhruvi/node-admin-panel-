const express = require('express');
const adminRoutes = express.Router();
const {
  addAdminPage,
  viewAllAdminPage,
  addNewAdmin,
  editAdminPage,
  updateAdmin,
  deleteAdmin
} = require("../controller/admin.controller");
const Admin = require('../model/admin.model');

adminRoutes.get("/add-admin", addAdminPage);
adminRoutes.get("/view-admins", viewAllAdminPage);
adminRoutes.post("/add-admin", Admin.uploadImage, addNewAdmin);
adminRoutes.get("/edit-admin/:id", editAdminPage);
adminRoutes.post("/update-admin/:id", Admin.uploadImage, updateAdmin);
adminRoutes.get("/delete-admin/:id", deleteAdmin);

module.exports = adminRoutes; 
