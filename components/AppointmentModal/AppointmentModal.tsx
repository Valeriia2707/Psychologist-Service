import css from "./AppointmentModal.module.css";
import Icon from "../ui/Icon/Icon";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button/Button";
import { Psychologist } from "@/types/psychologists";
import { handleTime } from "@/utils/timer";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAppointment } from "@/lib/services/appointments";
import { createPortal } from "react-dom";
import {memo} from 'react';
import { FirebaseError } from "firebase/app";

const AppointmentSchema = yup.object({
    name: yup.string().required(),
    phone: yup.string().min(9).max(9).matches(/^[0-9]+$/).required(),
    time: yup.string().required(),
    email: yup.string().email().required(),
    comment: yup.string().default('')
})

interface ModalProps {
    readonly value: string,
    onChange: (value: string) => void
    onClose: () => void
    psychologist: Psychologist
}

interface AppointmentFormData {
    name: string,
    phone: string,
    time: string,
    email: string,
    comment: string,
}

const timeOptions = handleTime();

const AppointmentModal = ({value, onChange, onClose, psychologist}:ModalProps ) => {

const [isOpen, setIsOpen] = useState(false);
const [error, setError] = useState('')

const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(AppointmentSchema)
    })

    const handleFormSubmit = async (data: AppointmentFormData) => {
    
            try{
                setError('')
                await addAppointment({...data, psychologistId: psychologist.id, psychologistName: psychologist.name});
                onClose();
            }
    
            catch(error){         
                        let userMessage = "Something went wrong. Please try again later";
            
                if (error instanceof FirebaseError) {
                    userMessage = "Failed to schedule an appointment. Please try again"
                }
            
                setError(userMessage);
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
            <div className={css.textWrapper}>
                <p className={css.heading}>Make an appointment with a psychologists</p>
                <p className={css.secondHeading}>You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.</p>
            </div>
            <div className={css.psychologistWrapper}>
                <div >
                    <Image className={css.avatarWrapper} src={psychologist.avatar_url} alt="psychologist avatar" width={44} height={44} />
                </div>
                <div className={css.avatarTextWrapper}>
                    <p className={css.firstText}>Your psychologists</p>
                    <p className={css.secondText}>{psychologist.name}</p>
                </div>
            </div>
            <div>
                <form className={css.inputWrapper} onSubmit={handleSubmit(handleFormSubmit)}>
                    <input {...register("name")} type="text" placeholder="Name" className={css.field}/>
                    {errors.name && <p>{errors.name.message}</p>}
                    <div className={css.phoneTimeInput}>
                        <input {...register('phone')} type="text" placeholder="+380" className={css.secondfield}/>
                        {errors.phone && <p>{errors.phone.message}</p>}
                        <div className={css.iconWrapper}>
                            <input onClick={() => setIsOpen(!isOpen)} type="text" placeholder="00:00" value={value} readOnly className={css.secondfield}/>
                            {errors.time && <p>{errors.time.message}</p>}
                            <Icon onClick={() => setIsOpen(!isOpen)} name="icon-clock" width={20} height={20} className={css.clockIcon}/>
                        </div>
                            {isOpen && (
                            <div className={css.optionList}>
                                <p className={css.timeText}>Meeting time</p>
                                <div className={css.options}>
                                {timeOptions.map(opt => {
                                const isActive = opt === value
                                return (
                                <button 
                                type="button" 
                                key={opt} 
                                className={`${css.optionBtn} ${isActive ? css.activeOpt : ""}`}
                                onClick={() => {
                                onChange(opt);
                                setValue("time", opt, { shouldValidate: true });
                                setIsOpen(false)
                                }}
                                >
                                {opt}
                                </button>
                                )
                                })}
                                </div>
                            </div>
                            )}
                    </div>
                        <input {...register('email')} type="email" placeholder="Email" className={css.field}/>
                        {errors.email && <p>{errors.email.message}</p>}
                        <textarea {...register('comment')} name="comment" className={css.thirdfield} placeholder="Comment"></textarea>
                        {errors.comment && <p>{errors.comment.message}</p>}
                    <Button variant="solid" className={css.btn}>Send</Button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    </div>, document.body
)
}

export default memo(AppointmentModal);

