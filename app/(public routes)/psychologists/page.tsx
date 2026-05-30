'use client'

import Filter from "@/components/Filter/Filter";
import { getAllPsychologists } from "@/lib/services/psychologists";
import { Psychologist } from "@/types/psychologists";
import Loading from "@/app/loading";
import { useEffect, useState } from "react"
import CardList from "@/components/CardList/CardList";
import Button from "@/components/ui/Button/Button";
import css from "./Psychologist.module.css"

const PsychologistPage = () => {
const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
const [activeFilter, setActiveFilter] = useState("all");
const [isLoading, setIsLoading] = useState(true);
const [limit, setLimit] = useState(3);

useEffect(() => {

    const loadData = async () => {
        try{
            const data = await getAllPsychologists();

            if(data){
                const list: Psychologist[] = Array.isArray(data) ? data : Object.keys(data).map(key => ({id: key, ...data[key]}));
                setPsychologists(list)
            }
        }
        catch(err) {
            console.error(err);
            
        }
        setIsLoading(false);
    }

    loadData();

}, [])


const handleFilter = (option: string) => {
    setActiveFilter(option);
    setLimit(3);
}

let copyPsychologist = [...psychologists];

switch (activeFilter) {
    case 'title_asc':
        copyPsychologist = copyPsychologist.sort((a, b) => a.name.localeCompare(b.name));
        break;
    case 'title_desc':
        copyPsychologist = copyPsychologist.sort((a, b) => b.name.localeCompare(a.name));
        break;
    case 'cheaper_price':
        copyPsychologist = copyPsychologist.filter((items) => items.price_per_hour < 10);
        break;
    case 'exp_price':
        copyPsychologist = copyPsychologist.filter((items) => items.price_per_hour > 10);
        break;
    case 'popular':
        copyPsychologist = copyPsychologist.sort((a, b) => b.rating - a.rating);
        break;
    case 'non_popular':
        copyPsychologist = copyPsychologist.sort((a, b) => a.rating - b.rating);
        break;
    default:
        break;
}

const visiblePsychologist = copyPsychologist.slice(0, limit);


return(
    <div className={css.container}>
        {isLoading && <Loading/>}
        <Filter value={activeFilter} onChange={handleFilter}/>
        <CardList items={visiblePsychologist}/>
        { copyPsychologist.length > limit && <Button className={css.button} variant="solid" onClick={() => setLimit(prev => prev + 3)}>Load more</Button>}
    </div>
)

}

export default PsychologistPage;