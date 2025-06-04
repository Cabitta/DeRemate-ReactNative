import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Authentication/Home";
import LoginScreen from "../screens/Authentication/Login";
import EmailRecoveryScreen from "../screens/Authentication/EmailRecovery";
import { NavigationContainer } from "@react-navigation/native";

import { Appbar } from "react-native-paper";
import { COLORS } from "../theme/appTheme"; 
import DeliveryHistoryScreen from "../screens/History/DeliveryHistoryScreen";
import TokenVerificationScreen from "../screens/Authentication/TokenVerification";
import NewPasswordSetupScreen from "../screens/Authentication/NewPasswordSetup";
import PasswordChangedScreen from "../screens/Authentication/PasswordChanged";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="EmailRecovery" component={EmailRecoveryScreen} />
    <Stack.Screen
      name="TokenVerification"
      component={TokenVerificationScreen}
    />
    <Stack.Screen name="NewPasswordSetup" component={NewPasswordSetupScreen} />
    <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
  </Stack.Navigator>
);

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

function AppNavigator() {
  return (
    <NavigationContainer>
      {}
      <Stack.Navigator initialRouteName="AuthFlow">
        <Stack.Screen
          name="AuthFlow" 
          component={AuthStack} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="DeliveryHistoryFlow" 
          component={DeliveryHistoryStack} 
          options={{ headerShown: false }}
        />
        {}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
