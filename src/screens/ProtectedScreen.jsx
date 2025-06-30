import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ButtonPaper from "../components/ButtonPaper";

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
      <Text style={styles.title}>Área Protegida</Text>

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            ¡Bienvenido, {user.firstname} {user.lastname}!
          </Text>
          <Text style={styles.emailText}>Email: {user.email}</Text>
        </View>
      )}
      <ButtonPaper title={"Cerrar Sesión"} onPress={handleLogout}/>
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
