import { useContext, useState } from "react";
import { Card, Divider, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "../theme/appTheme";
import DialogPaperComponent from "./DialogPaperComponent";
import { openGoogleMaps } from "../utils/helpers";
import { AvailableRoutesService } from "../services/AvailableRoutesService";
import { AuthContext } from "../context/AuthContext";

const AvailableRoutesCard = ({ availableRoute }) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const { user } = useContext(AuthContext);
  const { setRouteState } = AvailableRoutesService();

  const onAccept = () => {
    hideDialog();
    openGoogleMaps(availableRoute.address);
    setRouteState(availableRoute.id, "delivered", user.id);
  };

  return (
    <>
      <Card style={styles.card} onPress={showDialog}>
        <Card.Title
          title={`Direccion: ${availableRoute.address}`}
          titleStyle={styles.cardTitle}
        />
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardText}>
            Cliente
          </Text>
          <Text
            style={styles.cardText}
          >{`\tNombre:${availableRoute.client_name} ${availableRoute.client_lastname}`}</Text>
          <Text
            style={styles.cardText}
          >{`\tEmail: ${availableRoute.client_email}`}</Text>
          <Divider style={{ marginBlock: 10 }} />
          <Text variant="titleMedium" style={styles.cardText}>
            Ubicacion del paquete
          </Text>
          <Text
            style={styles.cardText}
          >{`\tSector: ${availableRoute.package_sector}`}</Text>
          <Text
            style={styles.cardText}
          >{`\tEstante: ${availableRoute.package_estante} Columna: ${availableRoute.package_columna_estante}`}</Text>
        </Card.Content>
      </Card>

      <DialogPaperComponent
        visible={visible}
        onCancel={hideDialog}
        onAccept={onAccept}
        title={`Ver Ruta: ${availableRoute.address}`}
        textOnAccept="Ver en Google Maps"
      >
        <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
          Has seleccionado la ruta a {availableRoute.address}. ¿Quieres ver el
          recorrido en Google Maps?
        </Text>
      </DialogPaperComponent>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
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
  },
  cardText: {
    color: COLORS.titleText,
    fontSize: 14,
    marginBottom: 4,
  },
});

export default AvailableRoutesCard;
