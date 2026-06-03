import css from "./Card.module.css";
import { Psychologist } from "@/types/psychologists";
import Image from "next/image";
import Icon from "../ui/Icon/Icon";
import { useCallback, useState } from "react";
import Button from "../ui/Button/Button";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useFavoritesStore } from "@/lib/store/useFavoritesStore";
import LoginModal from "../LoginModal/LoginModal";

interface CardProps {
    psychologist: Psychologist;
}

const Card = ({psychologist}: CardProps) => {

const [isExpand, setIsExpand] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [selectedTime, setSelectedTime] = useState<string>("");
const [isModalOpen, setIsModalOpen] = useState(false)

const user = useAuthStore((state) => state.user);
const favorites = useFavoritesStore((state) => state.items);
const toggleFavorites = useFavoritesStore((state) => state.toggleFavorites);
const isFavorite = !!favorites[psychologist.id]

const handleHeart = () => {
    if (user === null){
        setIsModalOpen(true);        
    } else {
        toggleFavorites(user.uid, psychologist.id, isFavorite, psychologist)
    }    
}

const handleModalCloseRegister = useCallback(() => {
    setIsModalOpen(false)
}, [])

const handleModalCloseAppointment = useCallback(() => {
    setIsOpen(false)
}, [])

return(
    <div className={css.cardWrapper}>
        <div className={css.imageWrapper}>
            <Icon name="icon-Group-82" width={14} height={14} className={css.dott}/>
            <Image src={psychologist.avatar_url} alt="psychologist photo" width={96} height={96} className={css.image}/>
        </div>
        <div className={css.infoWrapper}>
            <div className={css.firstContainer}>
                <p className={css.firstText}>Psychologist</p>
                <div className={css.priceContainer}>
                    <div className={css.priceWrapper}>
                        <div className={css.firstBlock}>
                    <Icon name="icon-star" width={16} height={16} className={css.iconStar}/>
                    <p className={css.priceText}>Rating: {psychologist.rating}</p>
                    </div>
                    <div className={css.secondBlock}>
                    <p className={css.priceText}>Price / 1 hour: <span className={css.priceSpan}>{psychologist.price_per_hour}$</span></p>
                    </div>
                    </div>
                    <Icon name="icon-heart"  width={26} height={26} className={`${css.iconHeart} ${isFavorite ? css.iconHeartFavorite : ''}`}
                    onClick={handleHeart}
                    />
                </div>
            </div>
            <div className={css.secondContainer}>
                <p className={css.nameText}>{psychologist.name}</p>
                <div className={css.detailsWrapper}>
                    <p className={css.detailsContainer}>Experience: <span className={css.badgeValue}>{psychologist.experience}</span></p>
                    <p className={css.detailsContainer}>License: <span className={css.badgeValue}>{psychologist.license}</span></p>
                    <p className={css.detailsContainer}>Specialization: <span className={css.badgeValue}>{psychologist.specialization}</span></p>
                    <p className={css.detailsContainer}>Initial_consultation: <span className={css.badgeValue}>{psychologist.initial_consultation}</span></p>
                </div>
            </div>
            <div className={css.thirdContainer}>
                <p className={css.thirdText}>{psychologist.about}</p>
                {!isExpand && (<button onClick={() => setIsExpand(true)} type="button" className={css.moreButton}>Read more</button>)}
                
            </div>
            {
        isExpand && (<>
            <div className={css.commentatorWrapper}>
            {psychologist.reviews.map((item, index) => (
            <div className={css.commentSection} key={item.reviewer + index}>
                <div className={css.commentator}>
                    <div className={css.avatar}>{item.reviewer.slice(0, 1)}</div>
                    <div className={css.commentatorInfo}>
                        <p className={css.commentatorName}>{item.reviewer}</p>
                        <div className={css.iconWrapper}>
                            <Icon name="icon-star" width={16} height={16}/>
                            <p className={css.commentatorRating}>{item.rating}</p>
                        </div>
                    </div>
                </div>
                <p className={css.commentText}>{item.comment}</p>
            </div>
        ))}
        </div>
        <Button className={css.appointmentBtn} onClick={ () => setIsOpen(true)} variant="solid">{'Make an appointment'}</Button>
        {isOpen && <AppointmentModal onClose={handleModalCloseAppointment} psychologist={psychologist} onChange={setSelectedTime} value={selectedTime}/>}
        </>)
    }
    {isModalOpen && <LoginModal onClose={handleModalCloseRegister}/>}
        </div>
    </div>
)
}

export default Card;