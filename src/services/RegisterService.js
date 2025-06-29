import { useAuthAxios } from "../hooks/useAuthAxios";
import { useCallback } from "react";
import { Alert } from "react-native";

export const RegisterService = () => {
  const axiosInstance = useAuthAxios();
  
  const fetchRegister = useCallback(
    async (formData) => {
      console.log("Enviando datos de registro:", formData);
      
      try {
        console.log("Entra al register");
        const response = await axiosInstance.post("/register", formData);
        
        console.log("Respuesta completa del servidor:", {
          status: response?.status,
          statusText: response?.statusText,
          headers: response?.headers,
          data: response?.data,
        });

        if (!response?.data) {
          throw new Error("No se recibieron datos del servidor");
        }

        // Si hay un error en la respuesta, lanzarlo
        if (response.data.error) {
          throw new Error(response.data.error);
        }

        return response.data;
      } catch (error) {
        console.error("Error completo:", error);
        console.error("Tipo de error:", error.name);
        console.error("Mensaje de error:", error.message);

        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          Alert.alert("Error en el registro", "Los datos proporcionados no son válidos o el usuario ya existe");
        } else if (error.request) {
          // La solicitud fue hecha pero no hubo respuesta del servidor
          Alert.alert(
            "No hubo respuesta del servidor. Vuelva a intentarlo mas tarde"
          );
        } else {
          // Otro tipo de error
          Alert.alert("Error inesperado", error.message);
        }
        throw error;
      }
    },
    [axiosInstance]
  );
  
  return fetchRegister;
};