import { useAuthAxios } from "../hooks/useAuthAxios";
import { useCallback } from "react";
import { Alert } from "react-native";

export const NewPasswordSetupService = () => {
  const axiosInstance = useAuthAxios();
  const fetchNewPasswordSetup = useCallback(
    async (code, newpassword, confirmPassword) => {
      console.log("Intentando al modificar la contraseña");
      try {
        console.log("Entra aca");
        const response = await axiosInstance.post("/resetpassword", {
          code,
          newpassword,
          confirmPassword,
        });
        return response.data;
      } catch (error) {
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          Alert.alert("Token o contraseñas no coincidentes");
        } else if (error.request) {
          // La solicitud fue hecha pero no hubo respuesta del servidor
          Alert.alert(
            "No hubo respuesta del servidor. Vuelva a intentarlo mas tarde"
          );
        } else {
          // Otro tipo de error
          Alert.alert("Error inesperado");
        }
        throw error;
      }
    },
    [axiosInstance]
  );
  return fetchNewPasswordSetup;
};
