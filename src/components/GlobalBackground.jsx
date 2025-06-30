import PropTypes from "prop-types";
import { View } from "react-native";
import { COLORS } from "../theme/appTheme";

const GlobalBackground = ({ children, color = COLORS.primaryBackground }) => {
  return <View style={{ flex: 1, backgroundColor: color }}>{children}</View>;
};

GlobalBackground.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default GlobalBackground;
