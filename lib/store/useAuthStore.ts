import {create} from "zustand";
import { User } from "firebase/auth";
import {signOut} from "firebase/auth"; 
import {auth} from "@/lib/firebase";

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
        set({user: null, isAuthenticated: false})
        await signOut(auth)
}
}));