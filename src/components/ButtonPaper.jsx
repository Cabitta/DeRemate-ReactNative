import { Button } from "react-native-paper";
import { COLORS, COMMON_STYLES } from "../theme/appTheme";
import PropTypes from "prop-types";

const ButtonPaper = ({
  title,
  onPress,
  buttonColor = COLORS.rojo,
  buttonDisabledColor = COLORS.grisDesahabilitado,
  style = COMMON_STYLES.button,
  labelStyle = COMMON_STYLES.buttonText,
  disabled = false,
}) => {
  return (
    <Button
      onPress={onPress}
      mode="contained"
      style={[style, disabled && { backgroundColor: buttonDisabledColor }]}
      labelStyle={labelStyle}
      buttonColor={!disabled ? buttonColor : undefined}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

ButtonPaper.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default ButtonPaper;
