import { Text } from "react-native-paper";
import { View } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../theme/appTheme";
import ButtonPaper from "./ButtonPaper";
import GlobalBackground from "./GlobalBackground";

const ErrorMessage = ({
  message = "Ocurrio un error. Intentelo de nuevo más tarde.",
  onPress,
}) => {
  return (
    <GlobalBackground>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          variant="titleLarge"
          style={{ color: COLORS.primaryButton, textAlign: "center" }}
        >
          {message}
        </Text>
        <ButtonPaper
          title={"Reintentar"}
          onPress={onPress}
          buttonColor={COLORS.primaryButton}
        />
      </View>
    </GlobalBackground>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
