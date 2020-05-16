const express = require("express");
const supertest = require("supertest");
const usersRouter = require("../users");
const User = require("../models/user");

const app = express();
app.use(express.json());
app.use("/api/users", usersRouter);
const api = supertest(app);

const initialUsers = [
    {
        username: "john",
        name: "John Smith",
        password: "sekret"
    },
    {
        username: "anna",
        name: "Anna Müller",
        password: "secret"
    }
];

beforeEach(async () => {
    await User.deleteMany({});
    initialUsers.forEach(newUser => User(newUser).save());
});

describe("initialization correct", () => {
    test("adding", async () => {
        const response = await api
            .post("/api/users")
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                username: "maria",
                name: "Maria Bergmann",
                password: "secret"
            }));
        expect(response.status).toEqual(200);

        const response2 = await User.find({});
        expect(response2).toHaveLength(initialUsers.length + 1);
    });
});

describe("check are correct", () => {
    test("short username", async () => {
        const response = await api
            .post("/api/users")
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                username: "ma",
                password: "123"
            }));
        expect(response.status).toEqual(400);
        expect(response.body.error).toBeDefined();
    });

    test("short password", async () => {
        // console.log(await User.find({}))
        const response = await api
            .post("/api/users")
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                username: "ivan",
                password: "12"
            }));
        expect(response.status).toEqual(400);
        expect(response.body.error).toBeDefined();
    });
})