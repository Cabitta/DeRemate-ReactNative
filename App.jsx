import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext'; 
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigator/>
      </PaperProvider>
    </AuthProvider>
  )
}
