const { info, error } = require("./logger");

try {
    require("dotenv").config();
    info("Dotenv loaded");
} catch (err) {
    info();
}

if (!("MONGODB_URI" in process.env)) {
    error("Can't find MongoDB URI");
    process.exit(2);
}

module.exports = {
    mongodb_uri: process.env.MONGODB_URI,
    port: process.env.PORT || 80
};