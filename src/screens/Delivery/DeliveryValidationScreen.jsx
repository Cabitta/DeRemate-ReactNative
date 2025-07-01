import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { COLORS } from '../../theme/appTheme';
import { useDeliveryConfirmationService } from '../../services/DeliveryConfirmationService';
import InputText from '../../components/InputText';
import ButtonPaper from '../../components/ButtonPaper';
import Loading from '../../components/Loading';
import GlobalBackground from '../../components/GlobalBackground';

const DeliveryValidationScreen = ({ route, navigation }) => {
  const { routeId, clientInfo, address } = route.params;
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { validateDeliveryCode } = useDeliveryConfirmationService();

  const handleValidateCode = async () => {
    // Validación básica
    if (!confirmationCode || confirmationCode.length !== 6) {
      Alert.alert('Error', 'Ingrese un código de 6 dígitos válido');
      return;
    }

    if (!/^\d{6}$/.test(confirmationCode)) {
      Alert.alert('Error', 'El código debe contener solo números');
      return;
    }

    try {
      setLoading(true);
      const response = await validateDeliveryCode(routeId, confirmationCode);
      
      // Éxito - Entrega completada
      Alert.alert(
        '🎉 Entrega Completada',
        'La entrega se ha registrado exitosamente.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Volver al tab principal
              navigation.reset({
                index: 0,
                routes: [{ name: 'ProtectedScreen' }],
              });
            }
          }
        ]
      );
    } catch (error) {
      // Los errores ya son manejados en el servicio
      console.log('Error handled by service');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Validando código..." />;
  }

  return (
    <GlobalBackground>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Confirmar Entrega"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Cliente:</Text>
              <Text style={styles.infoText}>{clientInfo}</Text>
              
              <Text style={styles.infoLabel}>Dirección:</Text>
              <Text style={styles.infoText}>{address}</Text>
            </View>
            
            <View style={styles.instructionSection}>
              <Text style={styles.instructionTitle}>
                📧 Código enviado al cliente
              </Text>
              <Text style={styles.instructionText}>
                El cliente ya recibió el código de 6 dígitos por email.
                Solicítale el código para confirmar la entrega.
              </Text>
            </View>
            
            <View style={styles.codeSection}>
              <InputText
                placeholder="Código de 6 dígitos"
                value={confirmationCode}
                onChangeText={setConfirmationCode}
                keyboardType="numeric"
                maxLength={6}
                style={styles.codeInput}
              />
              
              <ButtonPaper
                title="✅ Confirmar Entrega"
                onPress={handleValidateCode}
                buttonColor={COLORS.primaryButton}
                disabled={confirmationCode.length !== 6}
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    </GlobalBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    color: COLORS.primaryButton,
    fontWeight: 'bold',
    fontSize: 20,
  },
  infoSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: COLORS.primaryBackground,
    borderRadius: 8,
  },
  infoLabel: {
    color: COLORS.titleText,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
  infoText: {
    color: COLORS.subtitleText,
    fontSize: 16,
    marginBottom: 8,
  },
  instructionSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryButton,
  },
  instructionTitle: {
    color: COLORS.titleText,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  instructionText: {
    color: COLORS.subtitleText,
    fontSize: 14,
    lineHeight: 20,
  },
  codeSection: {
    gap: 16,
  },
  codeInput: {
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 4,
  },
});

export default DeliveryValidationScreen;