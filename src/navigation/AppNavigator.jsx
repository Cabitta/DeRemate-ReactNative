import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/Authentication/Home";
import LoginScreen from "../screens/Authentication/Login";
import EmailRecoveryScreen from "../screens/Authentication/EmailRecovery"
import { NavigationContainer } from "@react-navigation/native";

import DeliveryHistoryScreen from '../screens/History/DeliveryHistoryScreen';
import TokenVerificationScreen from '../screens/Authentication/TokenVerification';
import NewPasswordSetupScreen from '../screens/Authentication/NewPasswordSetup'
import PasswordChangedScreen from '../screens/Authentication/PasswordChanged';

const Stack = createNativeStackNavigator();
//const Tab = createBottomTabNavigator();

//const HomeStack = () => (
//  <Stack.Navigator>
//    <Stack.Screen name="Home" component={HomeScreen}/>
//    <Stack.Screen name="Login" component={LoginScreen}/>
//  </Stack.Navigator>
//);

//const DelivevryHistoryStack = () => (
//  <Stack.Navigator>
//    <Stack.Screen
//      name="DeliveryHistoryScreen"
//      component={DeliveryHistoryScreen}
//      options={{ title: 'Delivery History' }}
//    />
//  </Stack.Navigator>
//);

//const AppNavigator = () => (
//  <Tab.Navigator>
//    <Tab.Screen
//      name="HomeTab"
//      component={HomeStack}
//      options={{
//        headerShown: false,
//        tabBarLabel: 'Home',
//      }}
//    />
//    <Tab.Screen
//      name="DeliveryHistoryTab"
//      component={DelivevryHistoryStack} 
//      options={{
//        tabBarLabel: 'Delivery History',
//      }}
//    />
//  </Tab.Navigator>
//);

function MyStacks(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="EmailRecovery" component={EmailRecoveryScreen}/>
            <Stack.Screen name="TokenVerification" component={TokenVerificationScreen}/>
            <Stack.Screen name="NewPasswordSetup" component={NewPasswordSetupScreen}/>
            <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen}/>
        </Stack.Navigator>
    )
}

function AppNavigator(){
    return(
        <NavigationContainer>
            <MyStacks/>
        </NavigationContainer>
    )
}

export default AppNavigator;