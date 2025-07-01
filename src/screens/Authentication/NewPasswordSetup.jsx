import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {useState} from "react";
import image from '../../images/Logo.png'
import { useNavigation } from '@react-navigation/native';
import { NewPasswordSetupService } from '../../services/NewPasswordSetupService';
import { Alert} from 'react-native';
import InputText from '../../components/InputText';
import ButtonPaper from '../../components/ButtonPaper';

const NewPasswordSetupScreen =()=>{
  const navigation = useNavigation()
    const fetchNewPasswordSetup = NewPasswordSetupService()
    const [code, setCode] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleNewPasswordSetup = async () => {
      if (!code || !newpassword || !confirmPassword) {
        Alert.alert('Campos requeridos', 'Por favor complete ambos campos.');
        return;
      }
      try {
        const data = await fetchNewPasswordSetup(code, newpassword, confirmPassword);
        navigation.navigate('PasswordChanged');
      } catch (error) {
        Alert.alert('Error de modificacion de contraseña', 'Token o contraseña no aceptada.');
      }
  }
    return (
        <View style={styles.container}>
              <Image
                source={image}
                style={styles.image}
                resizeMode='contain'
              />
              <Text style={styles.title}>Reestablecimiento de Contraseña</Text>
              <StatusBar style="auto"/>
              <InputText placeholder="Ingrese el Token de Verificacion" value={code} onChangeText={setCode}/>
              <InputText placeholder="Ingrese la contraseña" value={newpassword} onChangeText={setNewpassword} secureTextEntry/>
              <InputText placeholder="Reingrese la contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry/>
              <ButtonPaper title={"Enviar"} onPress={handleNewPasswordSetup}/>
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
});

export default NewPasswordSetupScreen