const express = require("express");
const supertest = require("supertest");
const mainRouter = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const app = express();
app.use(express.json());
app.use("/api/blogs", mainRouter);
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
    const user = await User(initialUser);
    user.save();
    initialBlogs.forEach(blog => Blog({...blog, user: user}).save());
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

    test("errors on missing title", async () => {
        const response = await api
            .post("/api/blogs")
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                author: "Mugabe",
                url: "example.com"
            }));
        expect(response["status"]).toEqual(400);
    });
});

describe("post methods work", () => {
    test("post works", async () => {
        await api.post("/api/blogs").send({
            title: "Photos of ukrainian women",
            author: "Ivan",
            url: "example.com",
            likes: 91324
        });
        const {body} = await api.get("/api/blogs");
        expect(body).toHaveLength(initialBlogs.length + 1);
    });

    test("default likes to zero", async () => {
        const response = await api
            .post("/api/blogs")
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                title: "History",
                author: "Hans",
                url: "example.com"
            }));
        expect(response.body["likes"]).toEqual(0);
    });

    test("patch works", async () => {
        const response = await api.get("/api/blogs");
        const id = response.body[0].id;
        const response2 = await api
            .patch("/api/blogs/" + id)
            .set("Content-Type", "application/json")
            .send(JSON.stringify({
                title: "Engineering reactive boats"
            }));
        expect(response2.status).toEqual(200);
        expect(response2.body.title).toEqual("Engineering reactive boats");
    });

    test("delete works", async () => {
        const response = await api.get("/api/blogs");
        const id = response.body[0].id;
        const response2 = await api.delete("/api/blogs/" + id);
        expect(response2.status).toEqual(200);
        const response3 = await api.get("/api/blogs");
        expect(response3.body).toHaveLength(2);
    })

    test("print blogs", async () => {
        const response = await api.get("/api/blogs");
        console.log(response.body)
    })
});