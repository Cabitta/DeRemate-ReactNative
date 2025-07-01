import { useAuthAxios } from "../hooks/useAuthAxios";
import { useCallback } from "react";

export const useDeliveryHistoryService = () => {
  const axiosInstance = useAuthAxios();

  const fetchDeliveries = useCallback(
    async (agentId) => {
      try {
        const response = await axiosInstance.get(
          `/delivery-history-list?deliveryId=${agentId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching deliveries", error);
        throw error;
      }
    },
    [axiosInstance]
  );

  return { fetchDeliveries };
};
