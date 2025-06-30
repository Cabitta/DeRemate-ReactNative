import { useEffect, useState, useCallback, useContext } from "react";
import { ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import DeliveryHistoryCard from "../../components/DeliveryHistoryCard";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../theme/appTheme";
import { useDeliveryHistoryService } from "../../services/DeliveryHistoryService";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "../../components/ErrorMessage";

const DeliveryHistoryScreen = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { fetchDeliveries } = useDeliveryHistoryService();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const loadDeliveries = useCallback(async () => {
    //if (!user?.id) return;
    try {
      setLoading(true);
      setError(false);
      const data = await fetchDeliveries(user?.id);
      setDeliveries(data);

    } catch (err) {
      console.error("Failed to load deliveries in component", err);
      setError(true);

    } finally {
      setLoading(false);
    }
  }, [user?.id, fetchDeliveries]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeliveries();
    setRefreshing(false);
  };

  const handleRetry = () => {
    setLoading(true)
    loadDeliveries();
  } 

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No hay usuario autenticado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primaryButton]}
            tintColor={COLORS.primaryButton}
          />
        }
      >
        {loading ? (
          Loading()
        ) : error ? (
          <ErrorMessage message="Ocurrió un error al cargar las rutas entregadas. Intentalo nuevamente más tarde." onPress={handleRetry} />
        ) : deliveries.length === 0 && !error ? (
          <ErrorMessage message="No tenés rutas entregadas." onPress={handleRetry} />
        ) : (
          deliveries.map((delivery) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DeliveryDetailsScreen", {
                  deliveryId: delivery.id,
                })
              }
              key={delivery.id}
            >
              <DeliveryHistoryCard key={delivery.id} delivery={delivery} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  loader: {
    marginTop: 50,
    alignSelf: "center",
  },
  emptyText: {
    margin: 20,
    textAlign: "center",
    fontSize: 16,
    color: COLORS.subtitleText,
  },
  errorText: {
    margin: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#ff0000",
  },
});

export default DeliveryHistoryScreen;
