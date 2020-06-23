import React from 'react';

const Togglable = props => (
    <div>
        {
            props.isOpen
                ? props.children
                : <button type="button" onClick={props.toggle}>{props.name}</button>
        }
    </div>
)

export default Togglable