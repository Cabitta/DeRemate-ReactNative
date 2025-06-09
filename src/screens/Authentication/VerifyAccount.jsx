import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import image from "../../images/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { useAxios } from "../../hooks/useAxios";

const VerifyAccount = ({ route }) => {
  const navigation = useNavigation();
  const axios = useAxios();
  const email = route.params?.email;

  const [code, setCode] = useState("");

  const validateCode = () => {
    if (!code) {
      Alert.alert(
        "Campo requerido",
        "Por favor ingrese el código de verificación."
      );
      return false;
    }

    if (code.length !== 5 || !/^\d+$/.test(code)) {
      Alert.alert(
        "Código inválido",
        "El código debe tener 5 dígitos numéricos."
      );
      return false;
    }

    return true;
  };

  const handleVerify = async () => {
    if (!validateCode()) return;

    try {
      console.log("Enviando datos de verificación:", { email, code });

      const response = await axios.post("/verify", {
        email: email,
        code: code,
      });

      console.log("Respuesta del servidor:", response.data);

      Alert.alert(
        "Cuenta Verificada",
        "Su cuenta ha sido verificada exitosamente",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      console.error("Error en la verificación:", error);

      let errorMessage = "Error al verificar la cuenta";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={[styles.image, { resizeMode: "contain" }]} />
      <Text style={styles.title}>Verificar Cuenta</Text>
      <StatusBar style="auto" />

      <Text style={styles.subtitle}>
        Por favor ingrese el código de verificación enviado a su email
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Código de verificación"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={5}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verificar Cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Volver al Login</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
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
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 5,
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

export default VerifyAccount;
