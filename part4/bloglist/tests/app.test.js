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
        author: "Anna",
        likes: 10
    },
    {
        author: "Erik",
        likes: 9
    }
]

beforeEach(async () => {
    await Blog.deleteMany({});
    initialBlogs.forEach(blog => Blog(blog).save());
});

test("correct length", async() => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(2);
});

test("blogs have ID", async() => {
    const response = await api.get("/api/blogs");
    response.body.forEach(blog => expect(blog["id"]).toBeDefined());
});