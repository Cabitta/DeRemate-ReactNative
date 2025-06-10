import { useAuthAxios } from "../hooks/useAuthAxios";
import { useCallback } from "react";

export const useDeliveryDetailsService = () => {
  const axiosInstance = useAuthAxios();

  const fetchDeliveryDetails = useCallback(
    async (routeId) => {
      try {
        const response = await axiosInstance.get(
          `/delivery-details/${routeId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching delivery details", error);
        throw error;
      }
    },
    [axiosInstance]
  );

  return { fetchDeliveryDetails };
};
