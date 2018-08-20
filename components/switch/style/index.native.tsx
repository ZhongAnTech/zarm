import variables from '../../style/themes/default.native';
import { PixelRatio } from 'react-native';
export default {
  wrapperStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: variables.switch_width,
    height: variables.switch_height,
    borderRadius: variables.switch_height / 2,
    backgroundColor: variables.switch_background,
  },
  disabledWrapperStyle: {
    opacity: 0.5,
  },
  wrapperInActive: {
    borderWidth:  3 /  PixelRatio.get(),
    borderColor: variables.switch_border_color,
    backgroundColor: '#ffffff',
  },
  wrapperActive: {
    borderWidth: 0,
    backgroundColor: '#12C287',
  },
  circleStyle: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  circleInActive: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  circleActive: {
    width: 28,
    height: 27,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'rgba(0,127,84,1)',
  },
};
