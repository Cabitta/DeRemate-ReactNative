import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Card, Text, Divider } from "react-native-paper";
import { COLORS } from "../../theme/appTheme";
import { useDeliveryDetailsService } from "../../services/DeliveryDetailsService";
import Loading from "../../components/Loading";

const DeliveryDetailsScreen = ({ route }) => {
  const [deliveryDetail, setDeliveryDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchDeliveryDetails } = useDeliveryDetailsService();

  // Obtener el ID de la entrega desde los parámetros de la ruta
  const deliveryId = route.params?.deliveryId;

  useEffect(() => {
    const loadDeliveryDetails = async () => {
      if (!deliveryId) {
        setError("No se proporcionó un ID de entrega");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchDeliveryDetails(deliveryId);
        setDeliveryDetail(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar los detalles de la entrega:", err);
        setError("No se pudieron cargar los detalles de la entrega");
        setDeliveryDetail(null);
      } finally {
        setLoading(false);
      }
    };

    loadDeliveryDetails();
  }, [deliveryId, fetchDeliveryDetails]);

  const onRefresh = async () => {
    if (!deliveryId) return;

    setRefreshing(true);
    try {
      const data = await fetchDeliveryDetails(deliveryId);
      setDeliveryDetail(data);
      setError(null);
    } catch (err) {
      console.error("Error al actualizar los detalles:", err);
      // No actualizamos el error aquí para mantener los datos existentes
    } finally {
      setRefreshing(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return Loading();
  }

  if (error || !deliveryDetail) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {error || "No se encontraron detalles de la entrega"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primaryButton]}
          tintColor={COLORS.primaryButton}
        />
      }
    >
      <Card style={styles.card}>
        <Card.Title
          title="Detalles de la Entrega"
          titleStyle={styles.cardTitle}
        />
        <Card.Content>
          <View style={styles.infoRow}>
            <Text style={styles.label}>ID de Orden:</Text>
            <Text style={styles.value}>{deliveryDetail.orderId}</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Cliente:</Text>
            <Text style={styles.value}>{deliveryDetail.clientFullName}</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{deliveryDetail.address}</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Estado:</Text>
            <Text
              style={[styles.value, styles.statusText(deliveryDetail.status)]}
            >
              {deliveryDetail.status}
            </Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Código QR:</Text>
            <Text style={styles.value}>{deliveryDetail.qrCode}</Text>
          </View>
          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Ubicación del Paquete</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Sector:</Text>
            <Text style={styles.value}>
              {deliveryDetail.packageLocation?.sector}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Estante:</Text>
            <Text style={styles.value}>
              {deliveryDetail.packageLocation?.shelf}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Columna:</Text>
            <Text style={styles.value}>
              {deliveryDetail.packageLocation?.column}
            </Text>
          </View>
          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Tiempos</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Inicio:</Text>
            <Text style={styles.value}>
              {formatDate(deliveryDetail.initDateTime)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Finalización:</Text>
            <Text style={styles.value}>
              {formatDate(deliveryDetail.endDateTime)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tiempo de Entrega:</Text>
            <Text style={styles.value}>{deliveryDetail.deliveryTime}</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.primaryBackground,
    padding: 8,
  },
  card: {
    marginHorizontal: 8,
    marginVertical: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    elevation: 3,
    shadowColor: COLORS.titleText,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTitle: {
    color: COLORS.primaryButton,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    color: COLORS.titleText,
    fontWeight: "bold",
    fontSize: 14,
  },
  value: {
    color: COLORS.titleText,
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  divider: {
    marginVertical: 10,
    backgroundColor: COLORS.subtitleText,
    opacity: 0.2,
  },
  sectionTitle: {
    color: COLORS.primaryButton,
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
  },
  statusText: (status) => ({
    color:
      status === "delivered"
        ? "green"
        : status === "pending"
          ? "orange"
          : status === "in_progress"
            ? "blue"
            : COLORS.primaryButton,
    fontWeight: "bold",
  }),
  errorText: {
    margin: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#ff0000",
  },
});

export default DeliveryDetailsScreen;
