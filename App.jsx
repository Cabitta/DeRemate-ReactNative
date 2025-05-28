import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

import DeliveryHistoryScreen from './src/screens/History/DeliveryHistoryScreen';


const Stack = createNativeStackNavigator();

function AppContent() {
    const { isAuthenticated } = true; //TODO: Replace with authentication logic

    if (isAuthenticated === null) {
    return null; 
  }

    return (
        <NavigationContainer>
        {isAuthenticated ? (
            <AppNavigator />
        ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="DeliveryHistoryScreen" component={DeliveryHistoryScreen} /> 
            </Stack.Navigator> // TODO: Replace with LoginScreen
        )}
        </NavigationContainer>
   );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#f6f6f6',
  },
};


export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        {/* <AuthProvider> */}
          <AppContent />
        {/* </AuthProvider> */}
      </PaperProvider>
    </SafeAreaProvider>
  );
}