const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./app");
const { info } = require("./utils/logger");
const { port } = require("./utils/config");

const app = express();
app.use(express.json());
app.use(morgan("short"));
app.use("/api/blogs", mainRouter);
app.listen(port, () => info(`Server running on port ${port}`));