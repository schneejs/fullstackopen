const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
blogSchema.virtual("id").get(function() {
    return this._id;
});
blogSchema.set("toJSON", { virtuals: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;