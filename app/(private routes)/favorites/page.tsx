'use client'

import Filter from "@/components/Filter/Filter";
import Loading from "@/app/loading";
import { useEffect, useMemo, useState } from "react"
import CardList from "@/components/CardList/CardList";
import Button from "@/components/ui/Button/Button";
import css from "./Favorites.module.css"
import { useFavoritesStore } from "@/lib/store/useFavoritesStore";
import { useAuthStore } from "@/lib/store/useAuthStore";

const FavoritesPage = () => {
const [activeFilter, setActiveFilter] = useState("all");
const [isLoading, setIsLoading] = useState(true);
const [limit, setLimit] = useState(3);

const items = useFavoritesStore((state) => state.items);
const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);
const user = useAuthStore((state) => state.user)

useEffect(() => {


    const loadData = async () => {

        if (!user){ 
            setIsLoading(false)
            return;
        }

        try{

             await fetchFavorites(user.uid)

        }
        catch(err) {
            console.error(err);
            
        }
        finally{
        setIsLoading(false);
        }
    }

    loadData();

}, [user, fetchFavorites])




const handleFilter = (option: string) => {
    setActiveFilter(option);
    setLimit(3);
}

const processedArray = useMemo(() =>  {
const psychologistsMax = Object.keys(items).map((key) => ({
        ...items[key],
        id: key,
    }));



switch (activeFilter) {
    case 'title_asc':
        return psychologistsMax.sort((a, b) => a.name.localeCompare(b.name));
    case 'title_desc':
        return psychologistsMax.sort((a, b) => b.name.localeCompare(a.name));
    case 'cheaper_price':
        return psychologistsMax.filter((item) => item.price_per_hour <= 10);
    case 'exp_price':
        return psychologistsMax.filter((item) => item.price_per_hour >= 10);
    case 'popular':
        return psychologistsMax.sort((a, b) => b.rating - a.rating);
    case 'non_popular':
        return psychologistsMax.sort((a, b) => a.rating - b.rating);
    default: return psychologistsMax;
}
}, [items, activeFilter])



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

export default FavoritesPage;