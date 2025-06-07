import { StyleSheet } from 'react-native';

export const COLORS = {
  primaryBackground: '#ffe4c4', 
  primaryButton: '#E07A5F',    
  buttonText: '#ffffff',       
  titleText: '#FFFFFF',   
  subtitleText: '#000000',
  cardBackground: '#3B2F2F',
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
  }
});