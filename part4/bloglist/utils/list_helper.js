const { groupBy } = require("lodash");

const dummy = () => {
    return 1;
};

const totalLikes = blogs => {
    return blogs
        .map(blog => blog.likes)
        .reduce((acc, val) => acc + val);
};

const favoriteBlog = blogs => {
    if (blogs.length === 0)
        return;
    let leader = { index: 0, likes: blogs[0].likes };
    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > leader.likes)
            leader = { index: i, likes: blogs[i].likes };
    }
    return blogs[leader.index];
};

const mostBlogs = blogs => {
    if (blogs.length === 0)
        return;
    const blogsByAuthor = groupBy(blogs, blog => blog.author);
    let leader = {};
    for (let key in blogsByAuthor) {
        if (!("author" in leader) || blogsByAuthor[key].length > leader.blogs)
            leader = { author: key, blogs: blogsByAuthor[key].length };
    }
    return leader;
};

const mostLikes = blogs => {
    if (blogs.length === 0)
        return;
    const blogsByAuthor = groupBy(blogs, blog => blog.author);
    let leader = {};
    for (let key in blogsByAuthor) {
        const sumLikes = blogsByAuthor[key].map(blog => blog.likes).reduce((acc, val) => acc + val);
        if (!("author" in leader) || sumLikes > leader.likes)
            leader = { author: key, likes: sumLikes };
    }
    return leader;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};