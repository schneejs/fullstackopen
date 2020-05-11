const express = require("express");
const mongoose = require("mongoose");
const { info, error } = require("./utils/logger");
const { mongodb_uri } = require("./utils/config");
const Blog = require("./models/blog");

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => info("Connected to MongoDB"))
    .catch(err => error("Error: ", err));

const router = express.Router();

router.get("/", async (_, response, next) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs).end();
    } catch (err) {
        next(err);
    }
});

router.post("/", async (request, response, next) => {
    try {
        const blog = new Blog(request.body);
        await blog.save();
        response.status(201).end();
    } catch (err) {
        next(err);
    }
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