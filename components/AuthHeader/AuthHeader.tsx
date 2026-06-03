import { useAuthStore } from "@/lib/store/useAuthStore";
import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useCallback, useState } from "react";
import css from "./AuthHeader.module.css"


const AuthHeader = () => {

     const [RegisterisOpen, setRegisterIsOpen] = useState(false);
    const [LoginisOpen, setLoginIsOpen] = useState(false);

    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const handleCloseRegisterModal = useCallback(() => {
        setRegisterIsOpen(false)
    }, [])
    const handleCloseLoginModal = useCallback(() => {
        setLoginIsOpen(false)
    }, [])

    return(
        <>
        {user !== null ? <div className={css.logout}>
            <div className={css.userProfile}>
            <div className={css.avatar}><Icon width={24} height={24} name="icon-user"/></div>
            <p>{user.displayName}</p>
            </div>
            <Button variant="outline" onClick={clearAuth} className={css.buttonOutLine}>Log out</Button>
        </div> :
        <div className={css.login}>
            <Button variant="outline" className={css.buttonOutLine} onClick={() => setLoginIsOpen(true)}>Log In</Button>
            <Button variant="solid" className={css.buttonSolid} onClick={() => setRegisterIsOpen(true)}>Registration</Button>
        </div>}
        {LoginisOpen && <LoginModal onClose={handleCloseLoginModal} />}
            {RegisterisOpen && <RegisterModal onClose={handleCloseRegisterModal} />}
        </>
    )
}

export default AuthHeader;