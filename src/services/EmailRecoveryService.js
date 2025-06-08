import { useAxios } from '../hooks/useAxios'; 
import { useCallback } from 'react';

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
            if (error.response) {
                // El servidor respondió con un código de estado diferente de 2xx
                console.error("Error en el servidor:", error.response.status, error.response.data);
            } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta del servidor
                console.error("No hay respuesta del servidor", error.request);
            } else {
                // Otro tipo de error
                console.error("Error inesperado:", error.message);
            }
            throw error;
        }
    }, [axiosInstance])
    return fetchEmailRecovery
}