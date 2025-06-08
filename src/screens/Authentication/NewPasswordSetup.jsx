import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from "react";
import image from '../../images/Logo.png'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-web';
import { NewPasswordSetupService } from '../../services/NewPasswordSetupService';
import { Alert} from 'react-native';

const NewPasswordSetupScreen =()=>{
  const navigation = useNavigation()
    const fetchNewPasswordSetup = NewPasswordSetupService()
    const [code, setCode] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleNewPasswordSetup = async () => {
      console.log("Entra a modificar contraseña");
      if (!code || !newpassword || !confirmPassword) {
        Alert.alert('Campos requeridos', 'Por favor complete ambos campos.');
        return;
      }
      try {
        console.log("Intentando modificar contraseña")
        const data = await fetchNewPasswordSetup(code, newpassword, confirmPassword);
        console.log('Contraseña modificada exitosamente:', data);
        navigation.navigate('PasswordChanged');
      } catch (error) {
        console.log("Error en modificacion de contraseña")
        Alert.alert('Error de modificacion de contraseña', 'Token o contraseña no aceptada.');
      }
  }
    return (
        <View style={styles.container}>
              <Image
                source={image}
                style={[styles.image, { resizeMode: 'contain' }]}
              />
              <Text style={styles.title}>Reestablecimiento de Contraseña</Text>
              <StatusBar style="auto"/>
              <TextInput style={styles.input} placeholder='Ingrese el Token de Verificacion'
              value={code}
              onChangeText={setCode}
              />
              <TextInput style={styles.input} placeholder='Ingrese la contraseña'
              value={newpassword}
              onChangeText={setNewpassword}
              secureTextEntry/>
              <TextInput style={styles.input} placeholder='Reingrese la contraseña'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry/>
              <TouchableOpacity style={styles.button}
              onPress={() => handleNewPasswordSetup()}>
              <Text style={styles.buttonText}>Enviar</Text>
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

export default NewPasswordSetupScreen