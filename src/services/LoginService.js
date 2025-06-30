import { useAxios } from '../hooks/useAxios'; 
import { useCallback } from 'react';
import { Alert } from 'react-native';


export const LoginService = () => {
    const axiosInstance = useAxios()
    const fetchLogin = useCallback(async(email, password)=>
            
    {
        console.log("Intentando iniciar sesion")
        try{
            console.log("Entra aca")
            const response = await axiosInstance.post('/login', {email, password})
            return response.data
        }
        catch(error){
            if (error.response?.status === 401) {
                window.alert("El email y/o contraseña son incorrectos");
                //Alert.alert("El email y/o contraseña son incorrectos");
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
    return fetchLogin
}