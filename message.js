import { showMessage } from "react-native-flash-message";

export default flashMessage = (message, backgroundColor, color, position='top') => {
  showMessage({
    message: message,
    duration: 1700,
    animationDuration: 400,
    style: {
      backgroundColor: backgroundColor,
    }, titleStyle: {
      fontSize: 18,
      alignSelf: 'center',
      color: color
    },
    position:position
  });
}

