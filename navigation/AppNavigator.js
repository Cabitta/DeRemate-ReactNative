import React from "react"
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "../screens/Home"
import LoginScreen from "../screens/Login"

const Stack = createNativeStackNavigator()

function MyStacks(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component=
            {HomeScreen}/>
            <Stack.Screen name="Login" component=
            {LoginScreen}/>
        </Stack.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyStacks/>
        </NavigationContainer>
    )
}