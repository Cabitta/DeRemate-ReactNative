import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuthAxios } from '../hooks/useAuthAxios';
import { 
  configureNotifications, 
  requestNotificationPermissions, 
  startPeriodicNotifications, 
  stopPeriodicNotifications 
} from '../services/PushNotificationService';

function NotificationHandler() {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAuthAxios();

  useEffect(() => {
    if (!user || !user.id) {
      stopPeriodicNotifications();
      return;
    }

    async function setupNotifications() {
      await configureNotifications();
      const permissionsGranted = await requestNotificationPermissions();
      if (permissionsGranted) {
        startPeriodicNotifications(axiosInstance, user.id, .5); 
      } else {
        console.log('No se otorgaron permisos de notificación');
      }
    }
    
    setupNotifications();
    
    return () => {
      stopPeriodicNotifications();
    };
  }, [user, axiosInstance]); 

  return null; 
}

export default NotificationHandler;