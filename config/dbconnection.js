const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb+srv://dhruvi1685:dhruvi123@cluster0.mw1ii.mongodb.net/MovieDB")
    .then(() => console.log("Database connected successfully..."))
    .catch(err => console.error("Database Connection Error:", err));
};

module.exports = dbconnect();
