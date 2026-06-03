'use client'

import { useAuthStore } from "@/lib/store/useAuthStore";
import AuthHeader from "../AuthHeader/AuthHeader";
import css from "./Header.module.css";
import Link from "next/link";


const Header = () => {

    const user = useAuthStore((state) => state.user)

   
    return (  
<header className={css.header}>
    <div className={css.linkWrapper}>
<Link href='/' className={css.logo}>psychologists.<span className={css.span}>services</span></Link>
<nav>
    <ul className={css.navWrapper}>
        <li ><Link href='/' className={css.navLink}>Home</Link></li>
        <li ><Link href='/psychologists' className={css.navLink}>Psychologists</Link></li>
        {user !== null && <li ><Link href='/favorites' className={css.navLink}>Favorites</Link></li>}
    </ul>
</nav>
</div>
<AuthHeader/>
</header>
    )
}

export default Header;