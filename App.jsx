import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import DeliveryHistoryScreen from './src/screens/History/DeliveryHistoryScreen';
import AppNavigator from './src/navigation/AppNavigator';
export default function App() {
  return (
    <AppNavigator/>
  )
}

//function AppContent() {
//    const { isAuthenticated } = false; //TODO: Replace with authentication logic

//    if (isAuthenticated === null) {
//    return null; 
//  }

//    return (
//        <NavigationContainer>
//        {isAuthenticated ? (
//            <AppNavigator />
//        ) : (
//            <Stack.Navigator screenOptions={{ headerShown: false }}>
//                <Stack.Screen name="Home" component={HomeScreen} /> 
//                <Stack.Screen name="Login" component={LoginScreen}/>
//            </Stack.Navigator> // TODO: Replace with LoginScreen
//        )}
//        </NavigationContainer>
//   );
//}

//const theme = {
//  ...DefaultTheme,
//  colors: {
//    ...DefaultTheme.colors,
//    primary: '#6200ee',
//    secondary: '#03dac6',
//    background: '#f6f6f6',
//  },
//};


//export default function App() {
//  return (
//    <SafeAreaProvider>
//      <PaperProvider theme={theme}>
//        {/* <AuthProvider> */}
 //         <AppContent />
 //       {/* </AuthProvider> */}
 //     </PaperProvider>
//    </SafeAreaProvider>
//  );
//}