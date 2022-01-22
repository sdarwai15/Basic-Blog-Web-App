const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogApp');

const blogSchema = mongoose.Schema({
  post: String
}) 

module.exports = mongoose.model("user", blogSchema)