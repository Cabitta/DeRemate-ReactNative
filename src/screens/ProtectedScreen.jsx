import { View, StyleSheet} from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ButtonPaper from "../components/ButtonPaper";
import { Text, Card } from "react-native-paper";
import { openGoogleMaps } from "../utils/helpers";
import { COLORS } from "../theme/appTheme";
import { AvailableRoutesService } from "../services/AvailableRoutesService";

const ProtectedScreen = () => {
  const [inTransitRoute, setInTransitRoute] = useState(null);
  const [location, setLocation] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const { fetchInTransitRouteByDeliveyId } = AvailableRoutesService();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const fetchInTransitRoute = async (deliveryId) => {
    try {
      const data = await fetchInTransitRouteByDeliveyId(deliveryId);
      setInTransitRoute(data);
      setLocation(data?.address);
    } catch (error) {
      console.error("Error al obtener la ruta en tránsito:", error);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetchInTransitRoute(user.id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("inTransitRoute actualizado:", inTransitRoute);
    console.log("location actualizado:", location);
  }, [inTransitRoute, location]);

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            ¡Bienvenido, {user.firstname} {user.lastname}!
          </Text>
        </View>
      )}
      
      <ButtonPaper style={styles.logoutButton} onPress={() => navigation.navigate('qrCodeScreen')}>
        <Text style={styles.logoutText}>Escanear QR</Text>
      </ButtonPaper>

      <ButtonPaper style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </ButtonPaper>
      <ButtonPaper title={"Generar QR"} onPress={() => navigation.navigate('qrCodeScreen')} />
      <ButtonPaper title={"Mi ruta"} onPress={() => openGoogleMaps(location)} />
      <ButtonPaper
        title={"Confirmar Ruta"}
        onPress={() => navigation.navigate("PasswordChanged")}
      />
      <ButtonPaper title={"Cerrar Sesión"} onPress={handleLogout} />
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
  currentRouteCard: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    color: COLORS.primaryButton,
    fontWeight: "bold",
    fontSize: 18,
  },
  routeInfo: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 8,
  },
});

export default ProtectedScreen;
