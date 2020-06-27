import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('blog component', () => {
    test('renders only name when toggled off', () => {
        const user = {
            id: 43
        }

        const blog = {
            title: "11 title",
            url: "url.com",
            author: "Name",
            likes: 42,
            user
        }

        const component = render(
            <Blog blog={blog} user={user} setBlogs={() => undefined} />
        )

        expect(component.container).toHaveTextContent("11 title")
        expect(component.container).not.toHaveTextContent("Website")
        expect(component.container).not.toHaveTextContent("Name")
        expect(component.container).not.toHaveTextContent("42")
    })

    test('renders everything after Open button pressed', () => {
        const user = {
            id: 43
        }

        const blog = {
            title: "11 title",
            url: "url.com",
            author: "Name",
            likes: 42,
            user
        }

        const component = render(
            <Blog blog={blog} user={user} setBlogs={() => undefined} />
        )

        const button = component.getByText("Open")
        fireEvent.click(button)

        const div = component.container.querySelector(".blog")
        expect(div).toHaveTextContent("11 title")
        expect(div).toHaveTextContent("Website")
        expect(div).toHaveTextContent("Name")
        expect(div).toHaveTextContent("42")
    })

    test('clicking like twice works properly', () => {
        const user = {
            id: 43
        }

        const blog = {
            title: "11 title",
            url: "url.com",
            author: "Name",
            likes: 42,
            user
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog
                blog={blog} user={user} setBlogs={() => undefined}
                likeCallback={mockHandler}
            />
        )

        fireEvent.click(component.getByText("Open"))

        const button = component.getByText("Like")
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})