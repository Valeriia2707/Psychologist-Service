import {ref, set, push} from "firebase/database";
import {db} from "../firebase";

interface AppointmentProps{
    psychologistName: string,
    psychologistId: string
    name: string,
    phone: string,
    time: string,
    email: string,
    comment: string
}


export const addAppointment = async (appointmentsData: AppointmentProps) => {

 try{
        const appointmentRef = ref(db, 'appointments');

        const newAppointmentRef = push(appointmentRef);

        await set(newAppointmentRef, appointmentsData)

        return newAppointmentRef.key
    }
    catch(error){
        console.error("There is some error: ", error);
        throw error;
    }

}