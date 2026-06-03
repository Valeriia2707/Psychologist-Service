import {ref, get} from "firebase/database";
import {db} from "../firebase";

export const getAllPsychologists = async () => {
    try{
        const psychologistsRef = ref(db, '/psychologists');
        const snapshot = await get(psychologistsRef);

        if(snapshot.exists()){
            return snapshot.val();
        }

        return [];
    }
    catch(error){
        console.error("There is some error: ", error);
        throw error;
    }
}