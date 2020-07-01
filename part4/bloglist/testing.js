const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const { info, error } = require("./utils/logger");
const { mongodb_uri } = require("./utils/config");
const Blog = require('./models/blog')
const User = require('./models/user');

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => info("Connected to MongoDB"))
    .catch(err => error("Error: ", err));
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", true);
const router = express.Router();

const identifyUser = async (request, _, next) => {
    const authHeader = request.get("authorization");
    if (!(authHeader && authHeader.toLowerCase().startsWith("bearer")))
        request.user = null
    else {
        const token = authHeader.substring(7);
        const decodedToken = jwt.verify(token, secret);
        if (token && decodedToken.username)
            request.user = await User.findOne({ username: decodedToken.username });
        else
            request.user = null;
    }
    next();
}

router.use(identifyUser);

router.post("/reset", async (_, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(200).end()
})

router.post("/adduser", async (request, response) => {
    const body = request.body
    body.passwordHash = await bcrypt.hash(body.password, 7)
    delete body.password
    const user = new User(body)
    const savedUser = await user.save()
    response.status(201).json(savedUser).end()
})

router.post("/addblog", async (request, response) => {
    const body = request.body
    const blog = new Blog({ ...body, user: request.user })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog).end()
})

router.post("/setlikes", async (request, response) => {
    const body = request.body
    let user
    if ("id" in body)
        user = await User.findById(body.id)
    else if ("title" in body)
        user = await User.findOne({ title: body.title })
    else
        return response.status(404).end()
    user.likes = body.likes
    await user.save()
    response.end()
})

module.exports = router