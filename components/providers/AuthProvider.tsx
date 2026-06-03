'use client'

import { useAuthStore } from "@/lib/store/useAuthStore"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/lib/firebase";
import Loader from "@/app/loading"


const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [isLoading, setIsLoading] = useState(true);
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const pathname = usePathname();
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                clearAuth();
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, clearAuth]);

    useEffect(() => {
        const isPrivateRoute = pathname.startsWith('/favorites');
        
        if (!isLoading && !user && isPrivateRoute) {
            router.push("/psychologists");
        }
    }, [pathname, isLoading, user, router]);

    if (isLoading) {
        return <Loader />;
    }

    return <>{children}</>;

}

export default AuthProvider;