import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import image from "../../images/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { LoginService } from "../../services/LoginService";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import InputText from "../../components/InputText";
import ButtonPaper from "../../components/ButtonPaper";

const LoginScreen = () => {
  const navigation = useNavigation();
  const fetchLogin = LoginService();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos requeridos", "Por favor complete ambos campos.");
      return;
    }
    try {
      const response = await fetchLogin(email, password);
      const { token, refreshToken, expirationDate, user } = response;
      const tokens = { token, refreshToken, expirationDate };
      await login(tokens, user);
    } catch (error) {
      Alert.alert(
        "Error de autenticación",
        "Usuario o contraseña incorrectos."
      );
    }
  };
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Inicio de Sesion</Text>
      <StatusBar style="auto" />
      <InputText
        placeholder="Ingrese el usuario"
        value={email}
        onChangeText={setEmail}
      />
      <InputText
        placeholder="Ingrese la contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ButtonPaper
        title={"Iniciar Sesión"}
        onPress={handleLogin}
      />
      <ButtonPaper
        title={"Recuperar Contraseña"}
        onPress={() => navigation.navigate("EmailRecovery")}
      />
    </View>
  );
};
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
});

export default LoginScreen;
