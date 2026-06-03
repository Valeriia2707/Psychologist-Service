import {ref, set, get} from "firebase/database";
import {db} from "../firebase";
import { Psychologist } from "@/types/psychologists";

interface ToggleProps {
    userId: string,
    psychologistId: string,
    isFavorite: boolean,
    psychologistData: Psychologist;
}

export const toggleFavorite = async ({userId, psychologistId, isFavorite, psychologistData}:ToggleProps) => {

try{

        const toggleFavoriteRef = ref(db, `favorites/${userId}/${psychologistId}`);


    if(isFavorite){
       await set(toggleFavoriteRef, null)
    } else{
        await set(toggleFavoriteRef, psychologistData)
    }

    return psychologistId
        
    }
    catch(error){
        console.error("There is some error: ", error);
        throw error;
    }

}

export const getFavorites = async (userId: string) => {

try {
    const favoritesRef = ref(db, `favorites/${userId}`);
    const snapshot = await get(favoritesRef);
    if(snapshot.exists()){
        return snapshot.val()
    }
    return {}
}
catch(error){
        console.error("There is some error: ", error);
        throw error;
    }

}