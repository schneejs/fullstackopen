import { useState } from 'react'

export const useTextField = defaultValue => {
    const [value, setValue] = useState(defaultValue)

    const onChange = event => {
        setValue(event.target.value)
    }

    return [
        value,
        setValue,
        onChange
    ]
}