import { StyleSheet } from "react-native";

export const COLORS = {
  primaryBackground: "#ffe4c4",
  primaryButton: "#E07A5F",
  buttonText: "#ffffff",
  titleText: "#FFFFFF",
  subtitleText: "#000000",
  cardBackground: "#3B2F2F",
  rojo: "#8b0000",
  gris: "#808080",
  blanco: "#ffffff",
  grisDesahabilitado: "#BDBDBD",
};

export const COMMON_STYLES = StyleSheet.create({
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    width: 250,
    alignItems: "center",
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 250,
  },
  buttonText: {
    fontSize: 15,
    color: "#ffffff",
    width: 200,
    height: 25,
    textAlign: "center",
  },
  SecondaryButton: {
    backgroundColor: COLORS.primaryButton,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  SecondaryButtonText: {
    fontSize: 15,
    color: COLORS.buttonText,
    width: 120,
    height: 25,
    textAlign: "center",
  },
});
