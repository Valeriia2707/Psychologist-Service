import css from "./AppointmentModal.module.css";
import Icon from "../ui/Icon/Icon";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button/Button";

interface ModalProps {

    onClose: () => void
}

interface AppointmentFormData {
    name: string,
    phone: number,
    time: string,
    email: string,
    comment: string
}

interface Option {
    value: string,
    label: string
}

const AppointmentModal = ({onClose}:ModalProps ) => {

const [isOpen, setIsOpen] = useState(false);

const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
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

    const sortOptions: Option[] = [
    {value: "title_asc", label: "A to Z"},
    {value: "title_desc", label: "Z to A"},
    {value: "cheaper_price", label: "Less than 10$"},
    {value: "exp_price", label: "Greater than 10$"},
    {value: "popular", label: "Popular"},
    {value: "non_popular", label: "Not popular"},
    {value: "all", label: "Show all"},
]

return(
    <div className={css.overlay} onClick={handleBackDropClick}>
    <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
            <Icon name="icon-x" width={32} height={32} className={css.closeIcon}/>
        </button>
        <div className={css.textWrapper}>
            <p>Make an appointment with a psychologists</p>
            <p>You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.</p>
        </div>
        <div className={css.psychologistWrapper}>
            <div className={css.avatarWrapper}>
                <Image src={} alt="psychologist avatar" width={44} height={44} />
            </div>
            <div className={css.avatarTextWrapper}>
                <p>Your psychologists</p>
                <p>Dr. Sarah Davis</p>
            </div>
        </div>
        <div className={css.inputWrapper}>
            <form>
                <input type="text" placeholder="Name" className={css.field}/>
                <div className={css.phoneTimeInput}>
                    <input type="text" placeholder="+380" className={css.field}/>
                    <div className={css.iconWrapper}>
                    <input type="text" placeholder="00:00" className={css.field}/>
                    <Icon name="icon-clock" width={20} height={20} className={css.clockIcon}/>
                    </div>
                    {isOpen && (
                <div className={css.optionList}>
                    {sortOptions.map(opt => {
                        const isActive = opt.value === value
                        return (
                            <button 
                            type="button" 
                            key={opt.value} 
                            className={`${css.optionBtn} ${isActive ? css.activeOpt : ""}`}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false)
                            }}
                            >
                                {opt.label}
                            </button>
                        )
                        })}
                </div>
            )}
                    <input type="text" placeholder="Email"/>
                    <textarea name="Comment">Comment</textarea>
                </div>
            </form>
        </div>
        <Button variant="solid">Send</Button>
        </div>
        </div>
)
}

export default AppointmentModal;