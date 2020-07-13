const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const { info, error } = require("./utils/logger");
const { mongodb_uri } = require("./utils/config");

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => info("Connected to MongoDB"))
    .catch(err => error("Error:", err));
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const usersRouter = express.Router();

usersRouter.get("/", async (request, response, next) => {
    try {
        const res = await User.find({}).populate("notes");
        response.json(res).end();
    } catch (err) {
        next(err);
    }
});

usersRouter.post("/", async (request, response, next) => {
    const body = request.body;
    if (!body.password)
        return response.status(400).json({ detail: "Password is empty" }).end();
    else if (body.password.length < 3)
        return response.status(400).json({ detail: "Password must have at least 3 symbols" }).end();
    else if (body.username.length < 3)
        return response.status(400).json({ detail: "Username is too short"}).end();
    try {
        const passwordHash = await bcrypt.hash(body.password, 7);
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });
        const savedUser = await user.save();
        return response.json(savedUser).end();
    } catch (err) {
        next(err);
    }
});

usersRouter.use((error, _, response) => {
    console.log({error})
    if (error.name === "ValidatorError" || error.name === "ValidationError") {
        response.status(400).json({ detail: "Validation error" }).end();
    } else {
        console.error("Error:", error);
        response.status(500).json({ detail: "Unknown error" }).end();
    }
});

usersRouter.use((_, response) => {
    response.status(404).json({ detail: "Unknown path" }).end();
});

module.exports = usersRouter;