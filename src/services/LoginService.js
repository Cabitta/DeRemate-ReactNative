import { useAxios } from '../hooks/useAxios'; 
import { useCallback } from 'react';
import { Alert } from 'react-native';


export const LoginService = () => {
    const axiosInstance = useAxios()
    const fetchLogin = useCallback(async(email, password)=>
            
    {
        try{
            const response = await axiosInstance.post('/login', {email, password})
            return response.data
        }
        catch(error){
            if (error.response) {
                // El servidor respondió con un código de estado diferente de 2xx
                Alert.alert("El email y/o contraseña son incorrectos");
            } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta del servidor
                Alert.alert("No hubo respuesta del servidor. Vuelva a intentarlo mas tarde");
            } else {
                // Otro tipo de error
                Alert.alert("Error inesperado")
            }
            throw error;
        }
    }, [axiosInstance])
    return fetchLogin
}