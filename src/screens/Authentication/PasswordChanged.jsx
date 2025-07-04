import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import image from '../../images/Logo.png'
import { useNavigation } from '@react-navigation/native';
import ButtonPaper from '../../components/ButtonPaper';

const PasswordChangedScreen =()=>{
  const navigation = useNavigation()
    return (
        <View style={styles.container}>
          <Image source={image} style={styles.image} resizeMode='contain' />
          <Text style={styles.title}>La contraseña ha sido modificada con exito</Text>
          <StatusBar style="auto"/>
          <ButtonPaper title={"Ir a Inicio de Sesion"} onPress={()=> navigation.navigate('Login')} />
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

export default PasswordChangedScreen