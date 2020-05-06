const express = require("express");
const mongoose = require("mongoose");
const { info, error } = require("./utils/logger");
const { mongodb_uri } = require("./utils/config");

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => info("Connected to MongoDB"))
    .catch(err => error("Error: ", err));

const router = express.Router();

router.get("/", (_, response, next) => {
    Blog
        .find({})
        .then(blogs => response.json(blogs).end())
        .catch(error => next(error));
});

router.post("/", (request, response, next) => {
    const blog = new Blog(request.body);
    blog
        .save()
        .then(() => response.status(201).end())
        .catch(error => next(error));
});

router.use((error, _, response, next) => {
    if (error.name === "ValidatorError") {
        response.status(400).json({ error: "Validation error" }.end());
    } else
        response.status(500).status({ error: "Unknown error" }).end();
    next(error);
});

router.use((_, response) => {
    response.status(404).json({ error: "Unknown path" }).end();
});

module.exports = router;