import { Button } from "react-native-paper"
import { COMMON_STYLES } from "../theme/appTheme"
import PropTypes from 'prop-types'

const ButtonPaper = ({title, onPress}) => {
  return (
    <Button onPress={onPress} mode='contained' style= {COMMON_STYLES.button} labelStyle={COMMON_STYLES.buttonText}>
        {title}
    </Button>
  )
}

ButtonPaper.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

export default ButtonPaper