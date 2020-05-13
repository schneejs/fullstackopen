const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});
blogSchema.virtual("id").get(function() {
    return this._id;
});
blogSchema.set("toJSON", { virtuals: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;