import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from "react";
import image from '../../images/Logo.png'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-web';
import { EmailRecoveryService } from '../../services/EmailRecoveryService';
import { Alert} from 'react-native';
import InputText from '../../components/InputText';
import CustomButton from '../../components/CustomButton';
//import {TextInput} from 'react-native-web';

const EmailRecoveryScreen =()=>{
  const navigation = useNavigation()
  const fetchEmailRecovery = EmailRecoveryService()
  const [email, setEmail] = useState('');
  const handleEmailRecovery = async () => {
    console.log("Entra al handleEmailRecovery");
    console.log("Email:", email);
    if (!email) {
      Alert.alert('Campos requeridos', 'Por favor complete ambos campos.');
      return;
    }
    try {
      console.log("Intentando recuperar contraseña")
      const data = await fetchEmailRecovery(email);
      console.log('Email encontrado:', data);
      navigation.navigate('NewPasswordSetup');
    }catch (error) {
      console.log("Error en recuperacion de contraseña")
    }
  }
    return (
        <View style={styles.container}>
              <Image
                source={image}
                style={[styles.image, { resizeMode: 'contain' }]}
              />
              <Text style={styles.title}>Recuperacion de Contraseña</Text>
              <StatusBar style="auto"/>
              <InputText placeholder="Ingrese el correo electronico" value={email} onChangeText={setEmail}/>
              <CustomButton title="Enviar Correo Electronico" onPress={handleEmailRecovery} />
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

export default EmailRecoveryScreen