import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Appbar, Icon } from "react-native-paper";
import { COLORS } from "../theme/appTheme";
import { AuthContext } from "../context/AuthContext";

// Screens - Authentication
import HomeScreen from "../screens/Authentication/Home";
import LoginScreen from "../screens/Authentication/Login";
import RegisterScreen from "../screens/Authentication/Register";
import VerifyAccount from "../screens/Authentication/VerifyAccount";
import EmailRecoveryScreen from "../screens/Authentication/EmailRecovery";
import NewPasswordSetupScreen from "../screens/Authentication/NewPasswordSetup";
import PasswordChangedScreen from "../screens/Authentication/PasswordChanged";

// Screens - App
import ProtectedScreen from "../screens/ProtectedScreen";
import DeliveryHistoryScreen from "../screens/History/DeliveryHistoryScreen";
import AvailableRoutesScreen from "../screens/AvailableRoutesScreen";
import DeliveryDetailsScreen from "../screens/History/DeliveryDetailsScreen";
import QRScannerScreen from "../screens/QrCode/QRScanner"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerLeft = ({ navigation }) => ({
  headerLeft: () => (
    <Appbar.BackAction
      onPress={() => navigation.goBack()}
      color={COLORS.primaryButton}
    />
  ),
});

// Stack para usuarios no autenticados
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen name="EmailRecovery" component={EmailRecoveryScreen} />
      <Stack.Screen
        name="NewPasswordSetup"
        component={NewPasswordSetupScreen}
      />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
    </Stack.Navigator>
  );
}

// Tabs para la navegación dentro del área protegida
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        tabBarStyle: { backgroundColor: COLORS.blanco },
      }}
    >
      <Tab.Screen
        name="ProtectedScreen"
        component={ProtectedScreen}
        options={{
          title: "Inicio",
          tabBarIcon: () => (
            <Icon source="home" color={COLORS.gris} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="DeliveryHistoryStack"
        component={DeliveryHistoryStack}
        options={{
          title: "Historial de Entregas",
          headerShown: false,
          tabBarIcon: () => (
            <Icon source="history" color={COLORS.gris} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="AvailableRoutesScreen"
        component={AvailableRoutesScreen}
        options={{
          title: "Rutas Disponibles",
          tabBarIcon: () => (
            <Icon source="map-marker" color={COLORS.gris} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="qrCodeScreen"
        component={QRScannerScreen}
        options={{
          title: "QR Scanner",
          tabBarIcon: () => (
            <Icon source="map-marker" color={COLORS.gris} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const DeliveryHistoryStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
  >
    <Stack.Screen
      name="DeliveryHistoryScreen"
      component={DeliveryHistoryScreen}
      options={{
        title: "Historial de Entregas",
      }}
    />
    <Stack.Screen
      name="DeliveryDetailsScreen"
      component={DeliveryDetailsScreen}
      options={({ navigation }) => ({
        title: "Detalles de Entrega",
        ...headerLeft({ navigation }),
      })}
    />
  </Stack.Navigator>
);

function AppNavigator() {
  const { tokens, user } = useContext(AuthContext);
  const isAuthenticated = !!tokens && !!user;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AppNavigator;
