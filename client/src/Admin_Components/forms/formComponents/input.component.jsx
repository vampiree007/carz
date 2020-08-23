import React from 'react';
import './input.styles.css';

const Input = (props) => {
    const{value, handleChange, name, type, disabled, placeholder} = props
    return (
        <div>
            <input 
                type={type || 'text'}
                name={name} 
                value={value}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                className="form_input"
                />
        </div>
    )
}

export default Input;
