'use client'

import { createPortal } from "react-dom";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./LoginModal.module.css"
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

interface ModalProps {
    onClose: () => void
}

interface LoginFormData {
    email: string,
    password: string
}

const LoginModal = ({onClose}: ModalProps) => {

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema)
    })

    const handleFormSubmit = async (data: LoginFormData) => {

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password);
            onClose();
        }

        catch(error){
            console.error("There is error: ", error);
            
        }

    }

    const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget){
            onClose()
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
             document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = "";
        }
    }, [onClose])

return createPortal(
<div className={css.overlay} onClick={handleBackDropClick}>
    <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
            <Icon name="icon-x" width={32} height={32} className={css.closeIcon}/>
        </button>
<h2 className={css.heading}>Log In</h2>
<p className={css.text}>Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.</p>
<div className={css.inputWrapper}>
    <form onSubmit={handleSubmit(handleFormSubmit)} className={css.form}>
        <input {...register("email")} type="text" placeholder="Email" className={css.field}/>
        {errors.email && <p>{errors.email.message}</p>}
        <div className={css.iconWrapper}>
            <input {...register("password")} type={isVisible ? 'text' : 'password'} placeholder="Password" className={css.field}/>
            <button className={css.eyeButton} type="button" onClick={toggleVisibility}>
            {isVisible ? <Icon name="icon-eye-off" width={20} height={20} className={css.eyeIcon}/> : <Icon name="icon-eye" width={20} height={20} className={css.eyeIcon}/>}
            </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit" variant="solid" className={css.loginButton}>Log In</Button>
    </form>
</div>
    </div>
</div>, document.body
)
}

export default LoginModal;