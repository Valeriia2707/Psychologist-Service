import css from "./Header.module.css";
import Button from "../ui/Button/Button";
import Link from "next/link";

const Header = () => {
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
    <Button variant="outline">Log In</Button>
<Button variant="solid">Registration</Button>
</div>
</header>
    )
}

export default Header;