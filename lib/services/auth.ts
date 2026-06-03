import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase";
import Cookies from "js-cookie";

export const login = async (email: string, password: string) => {
    try {
        const userdata = await signInWithEmailAndPassword(auth, email, password);
        const user = userdata.user;
        const token = await user.getIdToken();

        Cookies.set("session_token", token, {
            expires: 7,
            secure: true,
            sameSite: 'strict'
        });

        return user;
    }
    catch (error) {
        console.error("There is error with authentication", error);
        throw error;
    }
}

export const logout = async () => {
    try{
        await signOut(auth);
    }
    catch (error) {
        console.error("There is error with logout", error);
        throw error;
    }
    finally{
        Cookies.remove('session_token')
    }
}