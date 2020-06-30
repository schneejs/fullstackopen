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

module.exports = router