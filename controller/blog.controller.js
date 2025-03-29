const Blog = require("../model/blog-model");
const path = require("path");
const fs = require("fs");

const addBlogPage = (req, res) => {
  res.render("add-blog");
};

const viewAllBlogPage = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("view-blogs", { blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Error fetching blogs");
  }
};

// const addNewBlog = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     if (!title || !content) {
//       return res.status(400).send("Title and Content are required");
//     }

//     const image = req.file ? `/uploads/${req.file.filename}` : null;
//     const newBlog = new Blog({ title, content, image });

//     await newBlog.save();
//     res.redirect("/blogs/view-blogs");
//   } catch (error) {
//     console.error("Error adding blog:", error);
//     res.status(500).send("Error adding blog");
//   }
// };

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


// const Blog = require("../model/blog-model");
// const path = require("path");
// const fs = require("fs");

// exports.addBlogPage = async (req, res) => {
//   try {
//     if (!req.cookies || !req.cookies.blog || !req.cookies.blog._id) {
//     }
//     let author = `${req.cookies.blog.firstname} ${req.cookies.blog.lastname}`;
//     let blog = await Blog.create({ ...req.body, author: author });
//     return res.redirect("/");
//   } catch (error) {
//     let blog = await Blog.findById(req.cookies.blog._id);
//   }
//   return res.render("add-blog", { blog });
// };

// exports.viewAllBlogPage = async (req, res) => {
//   if (
//     req.cookies == null ||
//     req.cookies.blog == undefined ||
//     req.cookies.blog._id == undefined
//   ) {
//     return res.redirect("/");
//   } else {
//     let loginBlog = await Blog.findById(req.cookies.blog._id);
//     let blogs = await Blog.find();
//     return res.render("view-blogs", { blogs, blog: loginBlog });
//   }
// };

// exports.addNewBlog = async (req, res) => {
//   try {
//     let imagePath = "";
//     if (req.file) {
//       imagePath = `/uploads/${req.file.filename}`;
//       req.body.image = imagePath;
//     }
//     let blog = await Blog.create({ ...req.body });
//     return res.redirect("back");
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.editBlogPage = async (req, res) => {
//   try {
//     let blog = await Blog.findById(req.params.id);
//     if (blog) {
//       return res.render("edit-blog", { blog });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.updateBlog = async (req, res) => {
//   try {
//     let blog = await Blog.findById(req.params.id);
//     if (blog) {
//       if (req.file) {
//         let imagePath = "";
//         if (blog.image !== "") {
//           imagePath = path.join(__dirname, "..", blog.image);
//           try {
//             await fs.unlinkSync(imagePath);
//           } catch (error) {
//             console.log("Image Not Found...");
//           }
//         }
//         imagePath = `/uploads/${req.file.filename}`;
//         req.body.image = imagePath;
//       }

//       let updateBlog = await Blog.findByIdAndUpdate(blog._id, req.body, {
//         new: true,
//       });
//       if (updateBlog) {
//         return res.redirect("/blog/view-blogs");
//       } else {
//         return res.redirect("back");
//       }
//     } else {
//       return res.redirect("back");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.deleteBlog = async (req, res) => {
//   try {
//     let blog = await Blog.findById(req.params.id);
//     if (!blog) return res.redirect("back");

//     if (blog.image) {
//       let imagePath = path.join(__dirname, "..", "public", blog.image);
//       try {
//         fs.unlinkSync(imagePath);
//       } catch (error) {
//         console.log("Image Not Found...");
//       }
//     }

//     await Blog.findByIdAndDelete(req.params.id);
//     return res.redirect("/blog/view-blogs");
//   } catch (error) {
//     console.error(error);
//     return res.redirect("back");
//   }
// };
