import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import image from './assets/Logo.png'
//import { Button } from 'react-native-web';
export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[styles.image, { resizeMode: 'contain' }]}
      />
      <Text style={styles.title}>El sabor que queres, en el momento que lo necesitas</Text>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.button}
      onPress={()=> console.log("Parte en progreso")}>
      <Text style={styles.buttonText}>Iniciar Sesion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
      onPress={()=> console.log("Parte en progreso")}>
      <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}
//'#ffffe0'
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
    width: 120,
    height: 25,
    textAlign: "center"
  }
});
