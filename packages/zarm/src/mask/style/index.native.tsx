import { Dimensions } from 'react-native';
import variables from '../../style/themes/default.native';

export default {
  wrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: variables.zindex_mask,
  },
  transparentWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  normalWrapper: {
    backgroundColor: `rgba(0, 0, 0, ${variables.opacity_mask})`,
  },
};
