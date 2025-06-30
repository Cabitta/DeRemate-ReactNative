import { TextInput, StyleSheet } from "react-native";

const InputText = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#777",
    height: 40,
    width: 250,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
});

export default InputText;
