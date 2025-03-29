const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const blogSchema =  mongoose.Schema(
  {
    title: { type: String},
    content: { type: String},
    author: { type: String },
    category: { type: String,},
    blogImage: { type: String }, 
    tags: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); 
  }
});

blogSchema.statics.uploadImage = multer({ storage: storage }).single("blogImage");

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
