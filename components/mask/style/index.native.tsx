import variables from '../../style/themes/default.native';
import { Dimensions } from 'react-native';
export default {

  // base
  wrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: variables.zindex_mask,
  },
  transparentWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  normalWrapper: {
    backgroundColor: 'rgba(0, 0, 0, ' + variables.opacity_mask + ')',
  },
};
