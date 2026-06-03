import {create} from "zustand";
import { User } from "firebase/auth";
import { logout } from "../services/auth";

interface UserStateProps {
user: User | null,
isAuthenticated: boolean,
setUser: (user: User | null) => void,
clearAuth: () => void
};

export const useAuthStore = create<UserStateProps>()((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: User | null) => set({user, isAuthenticated: !!user}),
    clearAuth: async () => {
        try {
            set({user: null, isAuthenticated: false})
        await logout();
        }
        catch(error){
            console.error("There is error with logout", error);
        }
        
}
}));
