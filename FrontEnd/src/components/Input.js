import React from 'react'

export default function Input(props) {
    return (
        <>
            <label htmlFor={props.name}>{props.title}</label>
            <input {...props} required />
        </>
    )
}
