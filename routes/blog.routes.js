const express = require('express');
const blogRoutes = express.Router();
const {
  addBlogPage,
  viewAllBlogPage,
  addNewBlog,
  editBlogPage,
  updateBlog,
  deleteBlog,
  getBlogDetails
} = require("../controller/blog.controller");
const Blog = require('../model/blog-model');

blogRoutes.get("/add-blog", addBlogPage);
blogRoutes.get("/view-blogs", viewAllBlogPage);
blogRoutes.post("/add-blog", Blog.uploadImage, addNewBlog);
blogRoutes.get("/edit-blog/:id", editBlogPage);
blogRoutes.post("/update-blog/:id", Blog.uploadImage, updateBlog);
blogRoutes.get("/delete-blog/:id", deleteBlog);
blogRoutes.get("/blogDetails/:id", getBlogDetails); 

module.exports = blogRoutes;