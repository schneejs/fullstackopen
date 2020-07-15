import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardSubtitle, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import Togglable from '../components/Togglable'
import { initializeBlogs } from '../reducers/blogs'
import { notify } from '../reducers/notification'
import blogService from '../services/blogs'
import createBlog from '../services/createBlog'
import { useTextField } from './useField'

const CreateBlogForm = props => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)

    const [title, setTitle, onTitleChange] = useTextField('')
    const [author, setAuthor, onAuthorChange] = useTextField('')
    const [url, setUrl, onUrlChange] = useTextField('')

    const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false)
    const toggleIsCreateBlogOpen = () => setIsCreateBlogOpen(!isCreateBlogOpen)

    const handleCreateBlogButton = event => {
        event.preventDefault()
        createBlog(user, title, author, url)
            .then(response => {
                if (response.status !== 201)
                    dispatch(notify(false, "Error while uploading the blog"))
                setTitle('')
                setAuthor('')
                setUrl('')
                setIsCreateBlogOpen(false)

                blogService.getAll().then(blogs =>
                    dispatch(initializeBlogs(blogs))
                )

                dispatch(notify(true, "Blog successfully added"))
            })
        if (props.createBlogCallback)
            props.createBlogCallback(title, author, url)
    }

    return (
        <Togglable name="Create blog" isOpen={isCreateBlogOpen} toggle={toggleIsCreateBlogOpen}>
            <h3>Create a blog</h3>
            <Form>
                <FormGroup>
                    <Label for='title'>Title</Label>
                    <Input id='title' className="titleinput" value={title} onChange={onTitleChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for='author'>Author</Label>
                    <Input id='author' className="authorinput" value={author} onChange={onAuthorChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for='url'>URL</Label>
                    <Input id='url' className="urlinput" value={url} onChange={onUrlChange}></Input>
                </FormGroup>
                <Button className="createblog" onClick={handleCreateBlogButton}>Create blog</Button>{' '}
                <Button className="createblogcancel" onClick={() => setIsCreateBlogOpen(false)}>Cancel</Button>
            </Form>
        </Togglable>
    )
}

CreateBlogForm.propTypes = {
    createBlogCallback: PropTypes.func
}

const Home = () => {
    const blogs = useSelector(store => store.blogs)

    return (
        <div>
            <h2>blogs</h2>
            <div id="blogs">
                {
                    blogs.map(blog => (
                        <Card key={blog.id}>
                            <CardBody>
                                <CardTitle tag={Link} to={`/blogs/${blog.id}`}>{blog.title}</CardTitle>
                                <CardSubtitle>Author: {blog.author}</CardSubtitle>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
            <CreateBlogForm />
        </div>
    )
}

export default Home