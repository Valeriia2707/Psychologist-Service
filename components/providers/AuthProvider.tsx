'use client'

import { useAuthStore } from "@/lib/store/useAuthStore"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {onIdTokenChanged} from "firebase/auth";
import {auth} from "@/lib/firebase";
import Loader from "@/app/loading";
import Cookies from "js-cookie";


const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [isLoading, setIsLoading] = useState(true);
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const pathname = usePathname();
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
            if (currentUser) {
                const newToken = await currentUser.getIdToken();
                Cookies.set("session_token", newToken, {
            expires: 7,
            secure: true,
            sameSite: 'strict'
        });
                setUser(currentUser);
            } else {
                setUser(null);
                Cookies.remove('session_token')
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, clearAuth]);

    useEffect(() => {
        const isPrivateRoute = pathname.startsWith('/favorites');
        
        if (!isLoading && !user && isPrivateRoute) {
            router.push("/");
        }
    }, [pathname, isLoading, user, router]);

    if (isLoading) {
        return <Loader />;
    }

    return <>{children}</>;

}

export default AuthProvider;