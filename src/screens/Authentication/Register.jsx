import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import image from "../../images/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import { RegisterService } from "../../services/RegisterService"; // ← Nuevo import
import { AuthContext } from "../../context/AuthContext";
import ButtonPaper from "../../components/ButtonPaper";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const fetchRegister = RegisterService(); // ← Usar el servicio
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
      await fetchRegister(formData); // ← Usar el servicio

      // Si llegamos aquí, el registro fue exitoso
      navigation.navigate("VerifyAccount", { email: formData.email });
    } catch (error) {
      // El error ya fue manejado en el servicio con Alert.alert
      // Solo necesitamos capturar la excepción
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
      <ButtonPaper title={"Registrarse"} onPress={handleRegister}/>
      <ButtonPaper title={"Volver al Login"} onPress={() => navigation.navigate("Login")}/>
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
