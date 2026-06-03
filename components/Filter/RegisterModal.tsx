'use client'

import { createPortal } from "react-dom";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./RegisterModal.module.css"
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

const registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

interface ModalProps {
    onClose: () => void
}

interface RegisterFormData {
    name: string,
    email: string,
    password: string
}

const RegisterModal = ({onClose}: ModalProps) => {

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema)
    })

    const handleFormSubmit = async (data: RegisterFormData) => {

        try{
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(auth.currentUser!, {displayName: data.name})
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
<h2 className={css.heading}>Registration</h2>
<p className={css.text}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
<div className={css.inputWrapper}>
    <form onSubmit={handleSubmit(handleFormSubmit)} className={css.form}>
        <input {...register("name")} type="text" placeholder="Name" className={css.field}/>
        {errors.name && <p>{errors.name.message}</p>}
        <input {...register("email")} type="text" placeholder="Email" className={css.field}/>
        {errors.email && <p>{errors.email.message}</p>}
        <div className={css.iconWrapper}>
            <input {...register("password")} type={isVisible ? 'text' : 'password'} placeholder="Password" className={css.field}/>
            <button className={css.eyeButton} type="button" onClick={toggleVisibility}>
            {isVisible ? <Icon name="icon-eye-off" width={20} height={20} className={css.eyeIcon}/> : <Icon name="icon-eye" width={20} height={20} className={css.eyeIcon}/>}
            </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit" variant="solid" className={css.loginButton}>Sign Up</Button>
    </form>
</div>
    </div>
</div>, document.body
)
}

export default RegisterModal;