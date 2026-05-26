'use client'

import css from './Button.module.css';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    variant: 'outline' | 'solid' | 'bigger-solid'
}

 const Button = ({className, children, variant, ...props}: ButtonProps) => {
    const buttonStyle = `${css.button} ${css[variant]} ${className || ''}`
    return (
        <button className={buttonStyle} {...props}>{children}</button>
    )
}

export default Button;