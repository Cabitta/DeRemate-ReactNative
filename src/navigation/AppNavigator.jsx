import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DeliveryHistoryScreen from '../screens/History/DeliveryHistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={Home} options={{ title: 'Home' }} />
  </Stack.Navigator>
);

const DelivevryHistoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DeliveryHistoryScreen"
      component={DeliveryHistoryScreen}
      options={{ title: 'Delivery History' }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen
      name="DeliveryHistoryTab"
      component={DelivevryHistoryStack} 
      options={{
        tabBarLabel: 'Delivery History',
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;