import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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

        const setBlogs = () => undefined

        const component = render(
            <Blog blog={blog} user={user} setBlogs={setBlogs} />
        )

        expect(component.container).toHaveTextContent("11 title")
        expect(component.container).not.toHaveTextContent("url.com")
        expect(component.container).not.toHaveTextContent("Name")
        expect(component.container).not.toHaveTextContent("42")
    })
})