import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/appTheme';

const AvailableRoutesCard = ({ availableRoute }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={`Direccion: ${availableRoute.address}`}
        titleStyle={styles.cardTitle}
      />
      <Card.Content>
        <Text style={styles.cardText}>{`Cliente: ${availableRoute.client_name} ${availableRoute.client_lastname}`}</Text>
        <Text style={styles.cardText}>{`Email: ${availableRoute.client_email}`}</Text>
      </Card.Content>
    </Card>
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
    alignSelf: 'stretch', // ocupa todo el ancho disponible menos el margen
  },
  cardTitle: {
    color: COLORS.primaryButton, 
    fontWeight: 'bold',
  },
  cardText: {
    color: COLORS.titleText, 
    fontSize: 14,
    marginBottom: 4,
  },
});


export default AvailableRoutesCard;
