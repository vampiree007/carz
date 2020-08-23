import React from 'react'

const Button = ({text, click}) => {
    return (
        <button
            onClick={()=>click} 
            className="material_button">
            {text}
        </button>
    )
}

export default Button;
