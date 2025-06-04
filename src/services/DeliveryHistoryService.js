import { useAxios } from '../hooks/useAxios'; 
import { useCallback } from 'react';

export const useDeliveryHistoryService = () => {
  const axiosInstance = useAxios(); 

  const fetchDeliveries = useCallback(async (agentId) => {
    try {
      const response = await axiosInstance.get(`/delivery-history-list?deliveryId=${agentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching deliveries', error);
      return []; 
    }
  }, [axiosInstance]);

  return { fetchDeliveries };
};
