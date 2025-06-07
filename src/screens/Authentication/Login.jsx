import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import image from "../../images/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const API_URL = "http://192.168.0.228:3000/api/login";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setTokens, setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_URL, {
        email,
        password,
      });

      const { token, refreshToken, expirationDate, user } = response.data;

      setTokens({
        token,
        refreshToken,
        expirationDate,
      });

      console.log(response.data);

      setUser(user);
    } catch (error) {
      console.error("Error de login:", error);
      Alert.alert("Error", "Credenciales incorrectas o error de servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={[styles.image, { resizeMode: "contain" }]} />
      <Text style={styles.title}>Inicio de Sesión</Text>
      <StatusBar style="auto" />

      <TextInput
        style={styles.input}
        placeholder="Ingrese su email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese la contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EmailRecovery")}
      >
        <Text style={styles.buttonText}>Recuperar Contraseña</Text>
      </TouchableOpacity>
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
