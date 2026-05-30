import { Psychologist } from "@/types/psychologists";
import css from "./CardList.module.css"
import Card from "../Card/Card";

interface ListProps {
items: Psychologist[]
}

const CardList = ({items}: ListProps) => {

    return(
        <div className={css.wrapper}>
            {items.map((item, index) => {
                return <Card key={index} psychologist={item}/>
            })}
        </div>
    )

}

export default CardList;