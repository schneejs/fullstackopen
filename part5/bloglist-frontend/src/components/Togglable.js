import React from 'react'
import PropTypes from 'prop-types'

const Togglable = props => (
    <div>
        {
            props.isOpen
                ? props.children
                : <button type="button" onClick={props.toggle}>{props.name}</button>
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