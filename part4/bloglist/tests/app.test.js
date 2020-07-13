const express = require("express");
const supertest = require("supertest");
const mainRouter = require("../app");
const loginRouter = require("../login");
const usersRouter = require("../users");
const Blog = require("../models/blog");
const User = require("../models/user");

const app = express();
app.use(express.json());
app.use("/api/blogs", mainRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
const api = supertest(app);

const initialBlogs = [
    {
        title: "Engineering reactive airplanes",
        author: "Anna",
        url: "example.com",
        likes: 10
    },
    {
        title: "Ecology of the world",
        author: "Erik",
        url: "example.com",
        likes: 9
    }
]

const initialUser = {
    username: "john",
    name: "John Smith",
    password: "sekret"
};

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const { body } = await api
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(JSON.stringify(initialUser));

    initialBlogs.forEach(blog => Blog({...blog, user: body.id}).save());
});

describe("read-only methods", () => {
    test("correct length", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test("blogs have ID", async () => {
        const response = await api.get("/api/blogs");
        response.body.forEach(blog => expect(blog["id"]).toBeDefined());
    });
});

let token;

describe("post methods work", () => {
    test("logging in works", async () => {
        const response = await api
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                username: initialUser.username,
                password: initialUser.password
            }));
        expect(response.status).toEqual(200);
        expect(response.body["token"]).toBeDefined();
        token = response.body.token;
    });

    test("post works", async () => {
        const response = await api
            .post("/api/blogs")
            .set("Authorization", "Bearer " + token)
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                title: "Photos of ukrainian women",
                author: "Ivan",
                url: "example.com",
                likes: 91324
            }));
        expect(response.status).toEqual(201);
        const { body } = await api.get("/api/blogs");
        expect(body).toHaveLength(initialBlogs.length + 1);
    });

    test("default likes to zero", async () => {
        const response = await api
            .post("/api/blogs")
            .set("Authorization", "Bearer " + token)
            .set("Content-Type", "application/json")
            .send(({
                title: "History",
                author: "Hans",
                url: "example.com"
            }));
        expect(response.body["likes"]).toEqual(0);
    });

    test("errors on missing title", async () => {
        const response = await api
            .post("/api/blogs")
            .set("Authorization", "Bearer " + token)
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                author: "Mugabe",
                url: "example.com"
            }));
        expect(response["status"]).toEqual(400);
    });

    test("patch works", async () => {
        const response = await api.get("/api/blogs");
        const id = response.body[0].id;
        const response2 = await api
            .patch("/api/blogs/" + id)
            .set("Authorization", "Bearer " + token)
            .set("Content-Type", "application/json")
            .send({
                title: "Engineering reactive boats"
            });
        expect(response2.status).toEqual(200);
        expect(response2.body.title).toEqual("Engineering reactive boats");
    });

    test("delete works", async () => {
        const response = await api.get("/api/blogs");
        const id = response.body[0].id;
        const response2 = await api
            .delete("/api/blogs/" + id)
            .set("Authorization", "Bearer " + token);
        expect(response2.status).toEqual(200);
        const response3 = await api.get("/api/blogs");
        expect(response3.body).toHaveLength(initialBlogs.length - 1);
    })
});