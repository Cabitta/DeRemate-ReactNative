import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import React from "react";
import image from '../assets/Logo.png'
import { TextInput } from 'react-native-web';
//import {TextInput} from 'react-native-web';

const LoginScreen =()=>{
    return (
        <View style={styles.container}>
              <Image
                source={image}
                style={[styles.image, { resizeMode: 'contain' }]}
              />
              <Text style={styles.title}>El sabor que queres, en el momento que lo necesitas</Text>
              <StatusBar style="auto"/>
              <TextInput style={styles.input} placeholder='Ingrese el Usuario'/>
              <TextInput style={styles.input} placeholder='Ingrese la Contraseña'/>
              <TouchableOpacity style={styles.button}
              onPress={()=> console.log("Parte en progreso")}>
              <Text style={styles.buttonText}>Iniciar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
              onPress={()=> console.log("Parte en progreso")}>
              <Text style={styles.buttonText}>Recuperar Contraseña</Text>
              </TouchableOpacity>
            </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdab9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    color: '#000000'
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center'
  },
  input: {
    padding: 10,
    marginTop: 20,
    borderWidth:1,
    borderColor: '#777',
    height: 40,
    width: 210,
    alignSelf: 'center',
    borderRadius: 30
  },
  button:{
    backgroundColor: "#8b0000",
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  buttonText:{
    fontSize: 15,
    color: "#ffffff",
    width: 200,
    height: 25,
    textAlign: "center"
  }
});

export default LoginScreen