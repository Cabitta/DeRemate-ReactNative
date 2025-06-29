import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import image from "../../images/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import { useAxios } from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const axios = useAxios();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert("Campos requeridos", "Por favor complete todos los campos.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Por favor ingrese un email válido.");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      console.log("Enviando datos de registro:", formData);

      console.log("Entra al register");
      const response = await axios.post("/register", formData);

      console.log("Respuesta completa del servidor:", {
        status: response?.status,
        statusText: response?.statusText,
        headers: response?.headers,
        data: response?.data,
      });

      if (!response?.data) {
        throw new Error("No se recibieron datos del servidor");
      }

      // Si hay un error en la respuesta, lanzarlo
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      Alert.alert(
        "Registro Exitoso",
        "Se ha enviado un código de verificación a su email",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("VerifyAccount", { email: formData.email }),
          },
        ]
      );
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Tipo de error:", error.name);
      console.error("Mensaje de error:", error.message);

      Alert.alert("Error en el registro", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Registro</Text>
      <StatusBar style="auto" />

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formData.firstname}
        onChangeText={(value) => handleChange("firstname", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={formData.lastname}
        onChangeText={(value) => handleChange("lastname", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
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

export default RegisterScreen;
