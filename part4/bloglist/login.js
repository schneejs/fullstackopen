const express = require("express");
const bcrypt = require("bcrypt");
const { info, error } = require("./utils/logger");
const { mongodb_uri } = require("./utils/config");
const User = require("./models/user");

const router = express.Router();

router.post("/", (request, response) => {
    const body = request.body;
    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user !== null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            detail: "Password or username are incorrect"
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return response.status(200).json({...userForToken, token});
});

module.exports = router;