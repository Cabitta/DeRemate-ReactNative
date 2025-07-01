import { View, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ButtonPaper from "../components/ButtonPaper";
import { Text } from "react-native-paper";
import { openGoogleMaps } from "../utils/helpers";
import { COLORS } from "../theme/appTheme";
import { AvailableRoutesService } from "../services/AvailableRoutesService";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

const ProtectedScreen = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inTransitRoute, setInTransitRoute] = useState(null);
  const [location, setLocation] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const { fetchInTransitRouteByDeliveyId } = AvailableRoutesService();

  const fetchData = async (deliveryId) => {
    try {
      setError(false);
      const data = await fetchInTransitRouteByDeliveyId(deliveryId);
      setInTransitRoute(data);
      setLocation(data?.address);
    } catch (error) {
      setError(true);
      console.error("Error al obtener la ruta en tránsito:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    fetchData(user.id);
  };

  useEffect(() => {
    const initialFetch = () => {
      fetchData(user.id);
    };
    initialFetch();
  }, []);

  // Pantallas

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Ocurrió un error al cargar la pantalla de inicio. Intentalo nuevamente más tarde."
        onPress={handleRetry}
      />
    );
  }

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            ¡Bienvenido, {user.firstname} {user.lastname}!
          </Text>
        </View>
      )}
      {inTransitRoute && (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            Mi Ruta:{inTransitRoute.address}
            {"\n"} Cliente:
            {inTransitRoute.client_name} {inTransitRoute.client_lastname} {"\n"}
            Email:
            {inTransitRoute.client_email}
          </Text>
        </View>
      )}

      <ButtonPaper
        title={"Escanear QR"}
        disabled={inTransitRoute}
        onPress={() =>
          navigation.navigate("qrCodeScreen", {
            deliveryId: user.id,
            routeId: inTransitRoute?.id,
          })
        }
      />
      <ButtonPaper
        title={"Abrir en Google Maps"}
        disabled={!location}
        onPress={() => openGoogleMaps(location)}
      />
      <ButtonPaper
        title={"Confirmar Ruta"}
        disabled={!inTransitRoute}
        onPress={
          () =>
            navigation.navigate("DeliveryValidationScreen", { inTransitRoute }) //TODO: cambiar inTransitRoute por route
        }
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
