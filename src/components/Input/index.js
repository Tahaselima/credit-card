import React from 'react'

export default function Input({label, ...props}) {
    return (
        <div>
            {label && <p>{label}</p>}
            <input
                {...props}
            />
        </div>
    );
}