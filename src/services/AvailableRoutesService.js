import { useAuthAxios } from "../hooks/useAuthAxios";
import { useCallback } from "react";

export const AvailableRoutesService = () => {
  const axiosInstance = useAuthAxios();

  const fetchAvailableRoutes = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/routes/availables`);
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.error(
          "Error en el servidor:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta del servidor
        console.error("No hay respuesta del servidor", error.request);
      } else {
        // Otro tipo de error
        console.error("Error inesperado:", error.message);
      }
      throw error;
    }
  }, [axiosInstance]);

  const setRouteState = useCallback(
    async (routeId, newState, newDelivery) => {
      try {
        const url = `/routes/set-state?routeId=${routeId}`;
        const data = {
          state: newState,
          delivery: newDelivery,
        };
        await axiosInstance.put(url, data);
      } catch (error) {
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.error(
            "Error en el servidor:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // La solicitud fue hecha pero no hubo respuesta del servidor
          console.error("No hay respuesta del servidor", error.request);
        } else {
          // Otro tipo de error
          console.error("Error inesperado:", error.message);
        }
        throw error;
      }
    },
    [axiosInstance]
  );

  const fetchInTransitRouteByDeliveyId = useCallback(
    async (deliveryId) => {
      try {
        const url = `/routes/in-transit?deliveryId=${deliveryId}`;
        const response = await axiosInstance.get(url);
        return response.data;
      } catch (error) {
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.error(
            "Error en el servidor:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // La solicitud fue hecha pero no hubo respuesta del servidor
          console.error("No hay respuesta del servidor", error.request);
        } else {
          // Otro tipo de error
          console.error("Error inesperado:", error.message);
        }
        throw error;
      }
    },
    [axiosInstance]
  );

  return {
    fetchAvailableRoutes,
    setRouteState,
    fetchInTransitRouteByDeliveyId,
  };
};
