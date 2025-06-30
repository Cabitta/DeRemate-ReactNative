import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "../theme/appTheme";

const DeliveryHistoryCard = ({ delivery }) => {
  const delivery_date = new Date(delivery.end_date_time).toLocaleDateString(
    "es-ES",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <Card style={styles.card}>
      <Card.Title
        title={`${delivery.client_name} ${delivery.client_lastname}`}
        titleStyle={styles.cardTitle}
      />
      <Card.Content>
        <Text style={styles.cardText}>Fecha: {delivery_date}</Text>
        <Text style={styles.cardText}>
          Tiempo de Entrega: {delivery.delivery_time}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: 16,
    marginVertical: 8,
    marginTop: 8,
    borderRadius: 8,
    elevation: 3,
    boxShadow: `0 1px 1.41px ${COLORS.titleText}`,
  },
  cardTitle: {
    color: COLORS.primaryButton,
    fontWeight: "bold",
  },
  cardText: {
    color: COLORS.titleText,
    fontSize: 14,
    marginBottom: 4,
  },
});

export default DeliveryHistoryCard;
