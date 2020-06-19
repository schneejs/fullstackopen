const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
const mainRouter = require("./app");
const usersRouter = require("./users");
const loginRouter = require("./login");
const { info } = require("./utils/logger");
const { port } = require("./utils/config");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("short"));
app.use("/api/blogs", mainRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.listen(port, () => info(`Server running on port ${port}`));