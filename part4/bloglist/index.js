const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
const mainRouter = require("./app");
const usersRouter = require("./users");
const loginRouter = require("./login");
const testingRouter = require("./testing")
const { info } = require("./utils/logger");
const { port, mode } = require("./utils/config");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("short"));
app.use("/api/blogs", mainRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
if (mode == "test" || mode == "development") {
    app.use("/api/testing", testingRouter);
}
app.listen(port, () => info(`Server running on port ${port}`));