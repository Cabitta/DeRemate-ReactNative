import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuthStore } from "../store/authStore";

const ProtectedScreen = () => {
  const { user, deleteStore } = useAuthStore();
  console.log("ProtectedScreen user:", user);

  const handleLogout = () => {
    deleteStore();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área Protegida</Text>

      {user && (
        <Text style={styles.welcomeText}>
          Bienvenido, {`${user.firstname || ""} ${user.lastname || ""}`}!
        </Text>
      )}

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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#8b0000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProtectedScreen;
