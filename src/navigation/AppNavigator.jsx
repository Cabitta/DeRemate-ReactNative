import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack para usuarios no autenticados
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen name="EmailRecovery" component={EmailRecoveryScreen} />
      <Stack.Screen name="NewPasswordSetup" component={NewPasswordSetupScreen} />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  );
}

// Tabs para la navegación dentro del área protegida
function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ProtectedScreen"
        component={ProtectedScreen}
        options={{
          title: "Inicio",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen
        name="DeliveryHistoryScreen"
        component={DeliveryHistoryStack}
        options={({ navigation }) => ({
          title: "Historial de Entregas",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        })}
        />
      <Tab.Screen
        name="AvailableRoutesScreen"
        component={AvailableRoutesScreen}
        options={({ navigation }) => ({
          title: "Rutas Disponibles",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Appbar.BackAction
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
            color={COLORS.primaryButton}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
            name="map-marker-path"
            color={color}
            size={size}
            />
          ),
        })}
        />
    </Tab.Navigator>
  );
}

const DeliveryHistoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DeliveryHistoryScreen"
      component={DeliveryHistoryScreen}
      options={({ navigation }) => ({
        title: "Historial de Entregas",
        headerTitleAlign: "center",
        headerLeft: () => (
          <Appbar.BackAction
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
            color={COLORS.primaryButton}
            />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="history" color={color} size={size} />
        ),
      })}
    />
    <Stack.Screen
      name="DeliveryDetailsScreen"
      component={DeliveryDetailsScreen}
      options={({ navigation }) => ({
        title: "Detalles de la Entrega",
        headerTitleAlign: "center",
        headerLeft: () => (
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color={COLORS.primaryButton}
          />
        ),
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