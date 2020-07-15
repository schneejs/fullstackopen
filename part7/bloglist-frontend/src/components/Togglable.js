import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'

const Togglable = props => (
    <div>
        {
            props.isOpen
                ? props.children
                : <Button type="button" onClick={props.toggle}>{props.name}</Button>
        }
    </div>
)

Togglable.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
}

export default Togglable