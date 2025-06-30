import { useAxios } from '../hooks/useAxios'; 
import { useCallback } from 'react';
import { Alert } from 'react-native';


export const NewPasswordSetupService = () => {
    const axiosInstance = useAxios()
    const fetchNewPasswordSetup = useCallback(async(code, newpassword, confirmPassword)=>
    {
        console.log("Intentando al modificar la contraseña")
        try{
            console.log("Entra aca")
            const response = await axiosInstance.post('/resetpassword', {code, newpassword, confirmPassword})
            return response.data
        }
        catch(error){
            if (error.response?.status === 400) {
                window.alert("Error. Token y/o contraseña no validos");
                //Alert.alert("Error. Token y/o contraseña no validos");
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
    return fetchNewPasswordSetup
}