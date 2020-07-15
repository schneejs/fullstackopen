import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap'
import { setLoading } from '../reducers/loading'
import { resetUser } from '../reducers/user'

const Button = props => <button type='button' {...props}>{props.children}</button>

const Panel = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)

    const isAuthorized = user !== null

    const logOut = () => {
        dispatch(resetUser())
        window.localStorage.removeItem("user")
        dispatch(setLoading(false))
    }

    return (
        <Navbar color='light' light expand='md'>
            <NavbarBrand tag={Link} to='/'>HyväBlogs.io</NavbarBrand>
            <Nav className='mr-auto'>
                <NavItem>
                    <NavLink tag={Link} to='/users'>Users</NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                {
                isAuthorized
                    ? <NavLink tag={Link} to={`/users/${user.id}`}>{user.username}</NavLink>
                    : null
                }
                </NavItem>
                <NavItem>
                {
                isAuthorized
                    ? <NavLink tag={Button} className='btn btn-link' onClick={logOut}>Log out</NavLink>
                    : <NavLink tag={Link} to='/login'>Log in</NavLink>
                }
                </NavItem>
            </Nav>
        </Navbar>
    )
}

export default Panel