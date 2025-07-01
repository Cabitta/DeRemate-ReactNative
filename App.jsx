import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext'; 
import { PaperProvider } from 'react-native-paper';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported in Expo Go'
]);

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
          <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  )
}
