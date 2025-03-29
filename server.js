const express = require('express');
const port = 8000;
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/dbconnection');
const app = express();

// middleware
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use("/", express.static(path.join(__dirname, 'public')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(express.urlencoded());

// routes
app.use("/", require("./routes/index.routes"));
app.use("/blogs", require("./routes/blog.routes")); 


app.listen(port, ()=> {
    console.log(`Server start at http://localhost:${port}`);
})