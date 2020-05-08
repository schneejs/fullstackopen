const listHelper = require("../utils/list_helper");

test("returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
})

describe("totalLikes", () => {
    const singleBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    test("single bloglist", () => {
        const result = listHelper.totalLikes(singleBlog);
        expect(result).toBe(5);
    });
});

describe("favoriteBlog", () => {
    const blogs = [
        {
            likes: 10
        },
        {
            likes: 25
        },
        {
            likes: 39
        }
    ];

    test("blog", () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual({ likes: 39 });
    });
});

describe("mostBlogs", () => {
    const blogs = [
        {
            author: "Anna"
        },
        {
            author: "John"
        },
        {
            author: "Anna"
        }
    ];

    test("simple", () => {
        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual({ author: "Anna", blogs: 2 });
    });
});

describe("mostLikes", () => {
    const blogs = [
        {
            author: "Anna",
            likes: 10
        },
        {
            author: "John",
            likes: 15
        },
        {
            author: "Anna",
            likes: 6
        }
    ];

    test("simple", () => {
        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual({ author: "Anna", likes: 16 });
    });
});
