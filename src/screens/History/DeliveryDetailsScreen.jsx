import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Divider } from "react-native-paper";
import { COLORS } from "../../theme/appTheme";

const deliveryDetail = {
  orderId: "6845c110e1dc0ff6e35dbf3a",
  clientFullName: "undefined undefined",
  address: "Boulevard Central 456",
  status: "delivered",
  qrCode: "PKG002",
  packageLocation: {
    sector: "B3",
    shelf: 3,
    column: 1,
  },
  initDateTime: "2025-04-04T01:33:21.995Z",
  endDateTime: "2025-04-05T17:33:21.995Z",
  deliveryTime: "40.00 hours",
};

//{deliveryDetail}
const DeliveryDetailsScreen = () => {
  // Formato de fechas
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

  if (!deliveryDetail) return null;

  return (
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
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    elevation: 3,
    shadowColor: COLORS.titleText,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignSelf: "stretch",
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
});

export default DeliveryDetailsScreen;
