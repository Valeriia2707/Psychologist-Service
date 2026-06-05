import { create } from "zustand";
import { getFavorites, toggleFavorite } from "../services/favorites";
import { Psychologist } from "@/types/psychologists";

interface FavoritesProps {
    items: Record<string, Psychologist>,
    isLoading: boolean,
    error: string | null,
    setFavorites: (favoritesData: Record<string, Psychologist>) => void,
    fetchFavorites: (userId: string) => Promise<void>,
    toggleFavorites: (userId: string, psychologistId: string, isFavorite: boolean, psychologistData: Psychologist) => Promise<void>,
    clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesProps>()((set, get) => ({
items: {},
isLoading: false,
error: null,
setFavorites: (favoritesData) => set({items: favoritesData || {}}),
fetchFavorites: async(userId: string) =>
    {
        set({ isLoading: true, error: null });
        try{
           const data = await getFavorites(userId);
            set({ items: data, isLoading: false });
        }
        catch (error: unknown) {
        set({isLoading: false });
        if (error instanceof Error) {
        console.log(error.message); 
    } else {
        console.log("An unexpected error occurred");
    }
    }},

toggleFavorites: async (userId: string, psychologistId: string, isFavorite: boolean, psychologistData: Psychologist) => {
    const currentItems = {...get().items};
    if (isFavorite){
        delete currentItems[psychologistId];
    } else{
        currentItems[psychologistId] = psychologistData;
    }
    set({ items: currentItems });
    await toggleFavorite({ userId, psychologistId, isFavorite, psychologistData })

},
clearFavorites: () => set({ items: {}, error: null, isLoading: false })
}))