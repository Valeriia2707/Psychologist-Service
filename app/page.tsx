import Icon from "@/components/ui/Icon/Icon";
import css from "./Home.module.css"
import Image from "next/image";
import Link from "next/link";


const Home = () => {
    return(
        <div className={css.homeContainer}>
            <div className={css.textWrapper}>
        <h1 className={css.heading}>The road to the <span className={css.headingOrange}>depths</span> of the human soul</h1>
        <p className={css.text}>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
        <Link href="/psychologists" className={css.buttonSolid}>Get started {<Icon name="icon-arrow" width={15} height={20} className={css.iconArrow}/>}</Link>
        </div>
        <div className={css.imageWrapper}>
        <Image className={css.image} src='/Images/psychologist.png' alt="psychologist" width={464} height={526}/>
        <div className={css.usersWrapper}>
            <Icon name="icon-users" width={25} height={25}/>
        </div>
        <div className={css.questionWrapper}>
            <Icon name="icon-question" width={10} height={17} className={css.iconQuestion} />
        </div>
        <div className={css.bannerWrapper}>
            <div className={css.checkWrapper}>
                <Icon name="icon-check" width={30} height={30}/>
            </div>
            <div className={css.bannerText}>
                <p className={css.imageText}>Experienced psychologists</p>
                <p className={css.imageNumbers}>15,000</p>
            </div> 
        </div>
        </div>
        </div>
    )
}

export default Home;