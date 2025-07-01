import { View, StyleSheet, TouchableOpacity} from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ButtonPaper from "../components/ButtonPaper";
import { Text } from "react-native-paper";
import { openGoogleMaps } from "../utils/helpers";

const ProtectedScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            ¡Bienvenido, {user.firstname} {user.lastname}!
          </Text>
        </View>
      )}
      
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('qrCodeScreen')}>
        <Text style={styles.logoutText}>Escanear QR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffdab9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    width: "100%",
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#000000",
  },
  emailText: {
    fontSize: 16,
    color: "#666666",
  },
  logoutButton: {
    backgroundColor: "#8b0000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    width: 250,
    alignItems: "center",
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProtectedScreen;
