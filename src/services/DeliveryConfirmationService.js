import { useAuthAxios } from "../hooks/useAuthAxios";
import { useCallback } from "react";
import { Alert } from "react-native";

export const useDeliveryConfirmationService = () => {
  const axiosInstance = useAuthAxios();

  /**
   * Genera código de confirmación y lo envía al cliente por email
   * PARA USO DEL EQUIPO QR SCANNER
   */
  const generateDeliveryCode = useCallback(
    async (routeId) => {
      try {
        const response = await axiosInstance.post('/delivery-codes/generate', {
          routeId
        });
        
        console.log("✅ Código generado y enviado al cliente:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ Error generando código:", error);
        
        if (error.response) {
          const errorMessage = error.response.data?.error || "Error generando código";
          console.error("Server error:", errorMessage);
          // NO mostramos Alert aquí - lo maneja el equipo QR
          throw new Error(errorMessage);
        } else if (error.request) {
          console.error("Network error:", error.request);
          throw new Error("Sin conexión al servidor");
        } else {
          console.error("Unexpected error:", error.message);
          throw new Error(error.message);
        }
      }
    },
    [axiosInstance]
  );

  /**
   * Valida el código de confirmación ingresado por el delivery
   * PARA USO DE TU EQUIPO (pantalla de validación)
   */
  const validateDeliveryCode = useCallback(
    async (routeId, confirmationCode) => {
      try {
        const response = await axiosInstance.post('/delivery-codes/validate', {
          routeId,
          confirmationCode
        });
        
        console.log("✅ Entrega confirmada:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ Error validando código:", error);
        
        if (error.response) {
          const errorMessage = error.response.data?.error || "Código incorrecto";
          const statusCode = error.response.status;
          
          // SÍ mostramos Alert porque es para tu UI
          if (statusCode === 400) {
            Alert.alert("Código inválido", errorMessage);
          } else if (statusCode === 410) {
            Alert.alert("Código expirado", errorMessage);
          } else if (statusCode === 404) {
            Alert.alert("Ruta no encontrada", errorMessage);
          } else {
            Alert.alert("Error", errorMessage);
          }
        } else if (error.request) {
          Alert.alert("Sin conexión", "Verifica tu conexión a internet");
        } else {
          Alert.alert("Error inesperado", error.message);
        }
        throw error;
      }
    },
    [axiosInstance]
  );

  return {
    generateDeliveryCode, // 🆕 Para el equipo QR Scanner
    validateDeliveryCode  // Para tu equipo (pantalla de validación)
  };
};