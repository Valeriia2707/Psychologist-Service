'use client'

import css from "./Header.module.css";
import Button from "../ui/Button/Button";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

const Header = () => {

    const [RegisterisOpen, setRegisterIsOpen] = useState(false);
    const [LoginisOpen, setLoginIsOpen] = useState(false);
    return (  
<header className={css.header}>
    <div className={css.linkWrapper}>
<Link href='/' className={css.logo}>psychologists.<span className={css.span}>services</span></Link>
<nav>
    <ul className={css.navWrapper}>
        <li ><Link href='/' className={css.navLink}>Home</Link></li>
        <li ><Link href='/psychologists' className={css.navLink}>Psychologists</Link></li>
    </ul>
</nav>
</div>
<div className={css.buttonWrapper}>
    <Button variant="outline" className={css.buttonOutLine} onClick={() => setLoginIsOpen(true)}>Log In</Button>
    {LoginisOpen && <LoginModal onClose={() => setLoginIsOpen(false)} />}
<Button variant="solid" className={css.buttonSolid} onClick={() => setRegisterIsOpen(true)}>Registration</Button>
{RegisterisOpen && <RegisterModal onClose={() => setRegisterIsOpen(false)} />}
</div>
</header>
    )
}

export default Header;