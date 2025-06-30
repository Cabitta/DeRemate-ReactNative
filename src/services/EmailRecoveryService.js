import { useAxios } from '../hooks/useAxios'; 
import { useCallback } from 'react';
import { Alert } from 'react-native';


export const EmailRecoveryService = () => {
    const axiosInstance = useAxios()
    const fetchEmailRecovery = useCallback(async(email)=>
            
    {
        console.log("Intentando recuperar contraseña")
        try{
            console.log("Entra aca")
            const response = await axiosInstance.post('/forgotpassword', {email})
            return response.data
        }
        catch(error){
            if (error.response?.status === 400) {
                window.alert("No existe una cuenta asociada con ese email");
                //Alert.alert("No existe una cuenta asociada con ese email");
            } 
            else if (error.response?.status === 500) {
                window.alert("No hubo respuesta del servidor. Vuelva a intentarlo mas tarde");
                //Alert.alert("No hubo respuesta del servidor. Vuelva a intentarlo mas tarde");
            } 
            else {
                // Otro tipo de error
                window.alert("Error inesperado")
                //Alert.alert("Error inesperado")
            }
            throw error;
        }
    }, [axiosInstance])
    return fetchEmailRecovery
}