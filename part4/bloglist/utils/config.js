const { info, error } = require("./logger");

try {
    require("dotenv").config();
    info("Dotenv loaded");
} catch (err) {
    info();
}

if (process.env.NODE_ENV === "test") {
    if ("MONGODB_TEST_URI" in process.env) {
        process.env.MONGODB_URI = process.env.MONGODB_TEST_URI;
    } else {
        error("Can't find MongoDB Test URI");
        process.exit(2);
    }
} else if (!("MONGODB_URI" in process.env)) {
    error("Can't find MongoDB URI");
    process.exit(2);
}

if (!process.env.SECRET) {
    error("Can't find SECRET key");
    process.exit(2);
}

module.exports = {
    mongodb_uri: process.env.MONGODB_URI,
    port: process.env.PORT || 80,
    secret: process.env.SECRET
};