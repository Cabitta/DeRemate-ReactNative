import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import DeliveryHistoryCard from '../../components/DeliveryHistoryCard';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../theme/appTheme';
import { useDeliveryHistoryService } from '../../services/DeliveryHistoryService';

const DeliveryHistoryScreen = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { fetchDeliveries } = useDeliveryHistoryService();

  const deliveryId = '6805cc605be788a9125b58c3'; // TODO: Replace deliveryId with context

  const loadDeliveries = useCallback(async () => {
    if (!deliveryId) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDeliveries(deliveryId);
        setDeliveries(data);
      } catch (err) {
        console.error("Failed to load deliveries in component", err);
        setError(err);
        setDeliveries([]);
      } finally {
        setLoading(false);
      }
  }, [deliveryId, fetchDeliveries]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeliveries();
    setRefreshing(false);
  };

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
          <ActivityIndicator
            animating={true}
            size="large"
            color={COLORS.primaryButton} 
            style={styles.loader}
          />
        ) : deliveries.length === 0 ? (
          <Text style={styles.emptyText}>No hay entregas disponibles.</Text>
        ) : (
          deliveries.map((delivery) => (
            <DeliveryHistoryCard key={delivery.id} delivery={delivery} />
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
    alignSelf: 'center',
  },
  emptyText: {
    margin: 20,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.titleText, 
  },
});

export default DeliveryHistoryScreen;
