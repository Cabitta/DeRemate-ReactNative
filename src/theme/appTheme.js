import { StyleSheet } from 'react-native';

export const COLORS = {
  primaryBackground: '#ffe4c4', 
  primaryButton: '#E07A5F',    
  buttonText: '#ffffff',       
  titleText: '#FFFFFF',   
  subtitleText: '#000000',
  cardBackground: '#3B2F2F',
  rojo: "#8b0000",
  gris: "#808080",
  blanco: "#ffffff",
};

export const COMMON_STYLES = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primaryButton,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  buttonText: {
    fontSize: 15,
    color: COLORS.buttonText,
    width: 120,
    height: 25,
    textAlign: "center"
  },
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
});