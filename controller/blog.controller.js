const Blog = require("../model/blog-model");
const path = require("path");
const fs = require("fs");

const addBlogPage = (req, res) => {
  res.render("add-blog");
};

const viewAllBlogPage = async (req, res) => {
  try {
    let { category, search, page } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" }; 
    }

    let limit = 6; 
    let currentPage = parseInt(page) || 1;
    let skip = (currentPage - 1) * limit;

    const totalBlogs = await Blog.countDocuments(query);
    const blogs = await Blog.find(query).skip(skip).limit(limit);

    let totalPages = Math.ceil(totalBlogs / limit);

    res.render("view-blogs", {
      blogs,
      category,
      search,
      currentPage,
      totalPages
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Error fetching blogs");
  }
};

const addNewBlog = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
      req.body.blogImage = imagePath;
    }
    let blog = await Blog.create({...req.body});
    return res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

const editBlogPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    res.render("edit-blog", { blog });
  } catch (error) {
    console.error("Error fetching blog for edit:", error);
    res.status(500).send("Error fetching blog for edit");
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, author, category, tags } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    if (req.file && blog.image) {
      try {
        fs.unlinkSync(path.join(__dirname, "..", "public", blog.image));
      } catch (error) {
        console.error("Previous image not found or already deleted:", error);
      }
    }

    blog.title = title;
    blog.content = content;
    blog.author = author;
    blog.category = category;
    blog.tags = tags ? tags.split(",").map(tag => tag.trim()) : [];

    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    }

    await blog.save();
    res.redirect("/blogs/view-blogs");
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send("Error updating blog");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.redirect("back");
    }

    if (blog.image) {
      const imagePath = path.join(__dirname, "..", "public", blog.image);
      try {
        fs.unlinkSync(imagePath);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/blogs/view-blogs");
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.redirect("back");
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.render("blogDetails", { blog });
  } catch (error) {
    console.error("Error fetching blog details:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addBlogPage,
  viewAllBlogPage,
  addNewBlog,
  editBlogPage,
  updateBlog,
  deleteBlog,
  getBlogDetails,
};
