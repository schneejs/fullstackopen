const express = require("express");
const supertest = require("supertest");
const mainRouter = require("../app");
const Blog = require("../models/blog");

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

beforeEach(async () => {
    await Blog.deleteMany({});
    initialBlogs.forEach(blog => Blog(blog).save());
});

test("correct length", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(2);
});

test("blogs have ID", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach(blog => expect(blog["id"]).toBeDefined());
});

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