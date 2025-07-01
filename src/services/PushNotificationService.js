import * as Notifications from 'expo-notifications';

export async function configureNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function sendNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });
}

let notificationInterval = null;

async function getNotifications(axiosInstance, agentId) {
  const response = await axiosInstance.get(
    `/notifications/check?deliveryId=${agentId}`
  );
  return response.data;
}

export function startPeriodicNotifications(axiosInstance, agentId, intervalMinutes = 1) {
  if (notificationInterval) {
    clearInterval(notificationInterval);
  }

  const intervalMs = intervalMinutes * 60 * 1000;
  
  console.log(`[Notification] Iniciando notificaciones periódicas cada ${intervalMinutes} minutos para el agente ${agentId}`);
  
  const checkAndNotify = async () => {
    try {
      const notificationData = await getNotifications(axiosInstance, agentId);
      if (notificationData && notificationData.title && notificationData.body) {
        await sendNotification(notificationData.title, notificationData.body);
        console.log('[Notification] Notificación enviada');
      }
    } catch (error) {
      console.error('[Notification] Error:', error);
    }
  };

  checkAndNotify();
  notificationInterval = setInterval(checkAndNotify, intervalMs);
  
  return true;
}

export function stopPeriodicNotifications() {
  if (notificationInterval) {
    clearInterval(notificationInterval);
    notificationInterval = null;
    console.log('[Notification] Notificaciones periódicas detenidas');
    return true;
  }
  return false;
}

export function isNotificationServiceRunning() {
  return notificationInterval !== null;
}