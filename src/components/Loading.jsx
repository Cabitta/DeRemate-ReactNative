import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { COLORS } from "../theme/appTheme";
import GlobalBackground from "./GlobalBackground";

const Loading = () => (
  <GlobalBackground>
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={COLORS.primaryButton}
        style={styles.loader}
      />
      <Text variant="titleMedium" style={{ color: COLORS.primaryButton }}>
        Cargando...
      </Text>
    </View>
  </GlobalBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginTop: 50,
    alignSelf: "center",
  },
});

export default Loading;
