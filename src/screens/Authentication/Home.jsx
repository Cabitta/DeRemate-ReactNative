import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import image from "../../images/Logo.png";
import CustomButton from "../../components/CustomButton";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={image} style={ styles.image } resizeMode="contain" />
      <Text style={styles.title}>
        El sabor que queres, en el momento que lo necesitas
      </Text>
      <StatusBar style="auto" />
      <CustomButton
        title="Iniciar Sesión"
        onPress={() => navigation.navigate("Login")}
      />
      <CustomButton
        title="Registrarse"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffdab9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#000000",
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
  },
});

export default HomeScreen;
