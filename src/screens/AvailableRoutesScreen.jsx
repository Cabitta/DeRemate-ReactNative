import { useState, useEffect } from "react";
import { ScrollView, RefreshControl } from "react-native";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import AvailableRoutesCard from "../components/AvailableRoutesCard";
import { AvailableRoutesService } from "../services/AvailableRoutesService";
import { COLORS } from "../theme/appTheme";
import GlobalBackground from "../components/GlobalBackground";

const AvailableRoutesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [availableRoutes, setAvailableRoutes] = useState([]);

  const { fetchAvailableRoutes } = AvailableRoutesService();

  const fetchData = async () => {
    try {
      setError(false);
      const data = await fetchAvailableRoutes();
      setAvailableRoutes(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleRetry = () => {
    setLoading(true);
    fetchData();
  };

  useEffect(() => {
    const initialFetch = () => {
      fetchData();
    };
    initialFetch();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Ocurrió un error al cargar las rutas disponibles. Intentalo nuevamente más tarde."
        onPress={handleRetry}
      />
    );
  }

  if (availableRoutes.length === 0 && !error) {
    return (
      <ErrorMessage
        message="No tenés rutas disponibles."
        onPress={handleRetry}
      />
    );
  }

  return (
    <GlobalBackground>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 24,
          flexGrow: 1,
          justifyContent: "center",
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primaryButton]}
            tintColor={COLORS.primaryButton}
          />
        }
      >
        {availableRoutes.map((route, idx) => (
          <AvailableRoutesCard key={idx} availableRoute={route} />
        ))}
      </ScrollView>
    </GlobalBackground>
  );
};

export default AvailableRoutesScreen;
