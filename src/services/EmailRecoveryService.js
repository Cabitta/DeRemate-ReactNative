import { useAuthAxios } from "../hooks/useAuthAxios";
import { useCallback } from "react";
import { Alert } from "react-native";

export const EmailRecoveryService = () => {
  const axiosInstance = useAuthAxios();
  const fetchEmailRecovery = useCallback(
    async (email) => {
      console.log("Intentando recuperar contraseña");
      try {
        console.log("Entra aca");
        const response = await axiosInstance.post("/forgotpassword", { email });
        console.log(response.data)
        return response.data;
      } catch (error) {
        if (error.response) {
          Alert.alert("El email no esta registrado como usuario");
        } else if (error.request) {
          Alert.alert(
            "No se pudo conectar al servidor. Vuelva a intentarlo mas tarde"
          );
        } else {
          Alert.alert("Error inesperado");
        }
        throw error;
      }
    },
    [axiosInstance]
  );
  return fetchEmailRecovery;
};
