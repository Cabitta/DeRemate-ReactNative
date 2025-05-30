import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import React from "react";
import image from '../../images/Logo.png'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-web';
//import {TextInput} from 'react-native-web';

const PasswordChangedScreen =()=>{
  const navigation = useNavigation()
    return (
        <View style={styles.container}>
              <Image
                source={image}
                style={[styles.image, { resizeMode: 'contain' }]}
              />
              <Text style={styles.title}>La contraseña ha sido modificada con exito</Text>
              <StatusBar style="auto"/>
              <TouchableOpacity style={styles.button}
              onPress={()=> navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Ir a Inicio de Sesion</Text>
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

export default PasswordChangedScreen