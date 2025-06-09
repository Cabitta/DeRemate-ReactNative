import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from "react";
import image from '../../images/Logo.png'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { LoginService } from '../../services/LoginService';
import { Alert} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


//import {TextInput} from 'react-native-web';

const LoginScreen =()=>{
  const navigation = useNavigation()
  const fetchLogin = LoginService()
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    console.log("Entra al handleLogin");
    console.log("Email:", email);
    console.log("Password:", password);
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor complete ambos campos.');
      return;
    }
    try {
      console.log("Intentando iniciar sesion")
      const data = await fetchLogin(email, password);
      console.log('Login exitoso:', data);
      await login(data.token);
      navigation.navigate('Home');
    } catch (error) {
      console.log("Error buscado", error.message)
      Alert.alert('Error de autenticación', 'Usuario o contraseña incorrectos.');
    }
  }
    return (
        <View style={styles.container}>
              <Image
                source={image}
                style={[styles.image, { resizeMode: 'contain' }]}
              />
              <Text style={styles.title}>Inicio de Sesion</Text>
              <StatusBar style="auto"/>
              <TextInput style={styles.input} placeholder='Ingrese el Usuario'
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"/>
              <TextInput style={styles.input} placeholder='Ingrese la Contraseña'
              value={password}
              onChangeText={setPassword}
              secureTextEntry/>
              <TouchableOpacity style={styles.button}
              onPress={() => handleLogin()}>
              <Text style={styles.buttonText}>Iniciar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
              onPress={()=> navigation.navigate('EmailRecovery')}>
              <Text style={styles.buttonText}>Recuperar Contraseña</Text>
              </TouchableOpacity>
            </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffdab9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#000000",
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  input: {
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#777",
    height: 40,
    width: 250,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#8b0000",
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 250,
  },
  buttonText: {
    fontSize: 15,
    color: "#ffffff",
    width: 200,
    height: 25,
    textAlign: "center",
  },
});

export default LoginScreen;
