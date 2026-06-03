'use client'

import Filter from "@/components/Filter/Filter";
import { getAllPsychologists } from "@/lib/services/psychologists";
import { Psychologist } from "@/types/psychologists";
import Loading from "@/app/loading";
import { useEffect, useMemo, useState } from "react"
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

                const list: Psychologist[] = Array.isArray(data) ? data.map((item, index) => ({id: String(index), ...item})) : Object.keys(data).map(key => ({id: key, ...data[key]}));
                setPsychologists(list)
        }
        catch(err) {
            console.error(err);
            
        }
        finally{
            setIsLoading(false);
        }
    }

    loadData();

}, [])

const handleFilter = (option: string) => {
    setActiveFilter(option);
    setLimit(3);
}

const processedArray = useMemo(() => {

    

    switch (activeFilter) {
    case 'title_asc':
        return [...psychologists].sort((a, b) => a.name.localeCompare(b.name));
    case 'title_desc':
        return [...psychologists].sort((a, b) => b.name.localeCompare(a.name));
    case 'cheaper_price':
        return psychologists.filter((item) => item.price_per_hour <= 10);
    case 'exp_price':
        return psychologists.filter((item) => item.price_per_hour >= 10);
    case 'popular':
        return [...psychologists].sort((a, b) => b.rating - a.rating);
    case 'non_popular':
        return [...psychologists].sort((a, b) => a.rating - b.rating);
    default: return psychologists;
    }

}, [activeFilter, psychologists])






const visiblePsychologist = processedArray.slice(0, limit);

if (isLoading) {
    return <Loading />;
}


return(
    <div className={css.container}>
        <Filter value={activeFilter} onChange={handleFilter}/>
        <CardList items={visiblePsychologist}/>
        { processedArray.length > limit && <Button className={css.button} variant="solid" onClick={() => setLimit(prev => prev + 3)}>Load more</Button>}
    </div>
)

}

export default PsychologistPage;