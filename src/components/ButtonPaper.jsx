import { Button } from "react-native-paper"
import { COLORS, COMMON_STYLES } from "../theme/appTheme"
import PropTypes from 'prop-types'

const ButtonPaper = ({title, onPress, buttonColor=COLORS.rojo, style = COMMON_STYLES.logoutButton, labelStyle = COMMON_STYLES.logoutText }) => {
  return (
    <Button onPress={onPress} mode='contained' style={style} labelStyle={labelStyle} buttonColor={buttonColor} >
        {title}
    </Button>
  )
}

ButtonPaper.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

export default ButtonPaper