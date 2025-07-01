import { View, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ButtonPaper from "../components/ButtonPaper";
import { Text, Card } from "react-native-paper";
import { openGoogleMaps } from "../utils/helpers";
import { COLORS } from "../theme/appTheme";
import { AvailableRoutesService } from "../services/AvailableRoutesService";

const ProtectedScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [currentRoute, setCurrentRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { fetchAvailableRoutes } = AvailableRoutesService();

  // Buscar si el delivery tiene una ruta en "in_transit"
  useEffect(() => {
    const checkCurrentRoute = async () => {
      try {
        const routes = await fetchAvailableRoutes();
        // Filtrar rutas que estén asignadas a este delivery y en estado "in_transit"
        const inTransitRoute = routes.find(
          route => route.delivery === user?.id && route.state === 'in_transit'
        );
        setCurrentRoute(inTransitRoute);
      } catch (error) {
        console.error('Error checking current route:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      checkCurrentRoute();
    }
  }, [user?.id, fetchAvailableRoutes]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleValidateDelivery = () => {
    navigation.navigate('DeliveryValidationScreen', {
      routeId: currentRoute.id,
      clientInfo: `${currentRoute.client_name} ${currentRoute.client_lastname}`,
      address: currentRoute.address
    });
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

      {/* 🆕 Mostrar ruta actual si está en tránsito */}
      {currentRoute && (
        <Card style={styles.currentRouteCard}>
          <Card.Title
            title="🚚 Entrega en Progreso"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.routeInfo}>
              Cliente: {currentRoute.client_name} {currentRoute.client_lastname}
            </Text>
            <Text style={styles.routeInfo}>
              Dirección: {currentRoute.address}
            </Text>
            <View style={styles.buttonContainer}>
              <ButtonPaper 
                title="📧 Validar Código" 
                onPress={handleValidateDelivery}
                buttonColor={COLORS.primaryButton}
              />
              <ButtonPaper 
                title="🗺️ Ver en Maps" 
                onPress={() => openGoogleMaps(currentRoute.address)}
                buttonColor={COLORS.rojo}
              />
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Botones generales */}
      <ButtonPaper title={"Mi ruta"} onPress={() => openGoogleMaps("UADE")} />
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
