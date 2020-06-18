const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { info, error } = require("./utils/logger");
const { mongodb_uri } = require("./utils/config");
const Blog = require("./models/blog");
const User = require("./models/user");

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => info("Connected to MongoDB"))
    .catch(err => error("Error: ", err));
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", true);
const router = express.Router();

const identifyUser = request => {
    const authHeader = request.get("authorization");
    if (!(authHeader && authHeader.toLowerCase().startsWith("bearer")))
        return null
    const token = authHeader.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!(token && decodedToken.id))
        return null;
    return await User.findById(decodedToken.id);
}

router.get("/", async (_, response, next) => {
    try {
        const blogs = await Blog.find({}).populate("user");
        response.json(blogs).end();
    } catch (err) {
        next(err);
    }
});

router.post("/", async (request, response, next) => {
    const user = identifyUser(request);
    if (!user)
        return response.status(401).json({ detail: "Token missing or invalid" });

    try {
        if (!("likes" in request.body))
            request.body.likes = 0;
        request.body.author = user.username;
        const blog = new Blog(request.body);
        const newBlog = await blog.save();
        response.status(201).json(newBlog).end();
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", async (request, response, next) => {
    const user = identifyUser(request);
    if (!user)
        return response.status(401).json({ detail: "Token missing or invalid" });

    try {
        const body = request.body;
        const res = await Blog.findOneAndUpdate({ id: request.param.id }, body, { new: true });
        response.status(200).json(res).end();
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (request, response, next) => {
    const user = identifyUser(request);
    if (!user)
        return response.status(401).json({ detail: "Token missing or invalid" });

    try {
        Blog.findOneAndDelete({ id: request.params.id });
        response.status(200).end();
    } catch (err) {
        next(err);
    }
});

router.use((error, _, response, next) => {
    if (error.name === "ValidatorError" || error.name === "ValidationError") {
        response.status(400).json({ error: "Validation error" }.end());
    } else
        response.status(500).status({ error: "Unknown error" }).end();
    next(error);
});

router.use((_, response) => {
    response.status(404).json({ error: "Unknown path" }).end();
});

module.exports = router;