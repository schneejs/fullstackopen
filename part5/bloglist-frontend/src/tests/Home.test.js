import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Home from '../components/Home'

describe('CreateBlog component', () => {
    test('createBlog callback works', () => {
        const mockHandler = jest.fn()

        const component = render(
            <Home
                isAuthorized={true}
                blogs={[]} user={{ username: "test" }}
                notify={() => undefined}
                setBlogs={() => undefined}
                createBlogCallback={mockHandler}
            />
        )

        fireEvent.click(component.getByText("Create blog"))
        fireEvent.click(component.getByText("Create blog"))

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})