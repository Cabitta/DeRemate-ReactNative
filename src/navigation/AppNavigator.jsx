import { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { COLORS } from "../theme/appTheme";

import HomeScreen from "../screens/Authentication/Home";
import LoginScreen from "../screens/Authentication/Login";
import RegisterScreen from "../screens/Authentication/Register";
import VerifyAccount from "../screens/Authentication/VerifyAccount";
import EmailRecoveryScreen from "../screens/Authentication/EmailRecovery";
import TokenVerificationScreen from "../screens/Authentication/TokenVerification";
import NewPasswordSetupScreen from "../screens/Authentication/NewPasswordSetup";
import PasswordChangedScreen from "../screens/Authentication/PasswordChanged";
import ProtectedScreen from "../screens/ProtectedScreen";
import DeliveryHistoryScreen from "../screens/History/DeliveryHistoryScreen";
import { AuthContext } from "../context/AuthContext";
import AvailableRoutesScreen from "../screens/AvailableRoutesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack para usuarios no autenticados
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
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
        name="TokenVerification"
        component={TokenVerificationScreen}
      />
      <Stack.Screen
        name="NewPasswordSetup"
        component={NewPasswordSetupScreen}
      />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
    </Stack.Navigator>
  );
}

const DeliveryHistoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Historial de Entregas"
      component={DeliveryHistoryScreen}
      options={({ navigation }) => ({
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
      })}
    />
  </Stack.Navigator>
);

// Tabs para la navegación dentro del área protegida
function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={ProtectedScreen}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="Historial de Entregas"
        component={DeliveryHistoryScreen}
        options={({ navigation }) => ({
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
        })}
      />
      <Tab.Screen
        name="Rutas Disponibles"
        component={AvailableRoutesScreen}/>
    </Tab.Navigator>
  );
}

function ProtectedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      {/* Aquí puedes añadir más pantallas protegidas que no sean tabs */}
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { tokens, user } = useContext(AuthContext);
  const isAuthenticated = !!tokens && !!user;

  return (
    <NavigationContainer>
      {isAuthenticated ? <ProtectedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AppNavigator;
