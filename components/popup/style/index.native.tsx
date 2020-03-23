import { Dimensions } from 'react-native';
import variables from '../../style/themes/default.native';

export default {
  container: {
    flexDirection: 'row',
  },

  // base
  wrapperStyle: {
    // [@REMOVE] paddingLeft: variables.button_padding_h_md,
    // [@REMOVE] paddingRight: variables.button_padding_h_md,
    position: 'absolute',
    zIndex: variables.zindex_popup,
    // [@REMOVE] backgroundColor: '#fff',
  },

  // position
  bottomWrapper: {
    left: 0,
    width: '100%',
  },
  topWrapper: {
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0 , 0, 0.7)',
    justifyContent: 'center',
  },
  leftWrapper: {
    top: 0,
    height: '100%',
  },
  rightWrapper: {
    top: 0,
    height: '100%',
  },
  invisibleWrapper: {
    height: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  topInvisible: {
    left: 0,
    top: 0,
    width: Dimensions.get('screen').width,
  },
  bottomInvisible: {
    left: 0,
    bottom: 0,
    width: Dimensions.get('screen').width,
  },
  leftInvisible: {
    left: 0,
    top: 0,
    height: Dimensions.get('screen').height,
  },
  rightInvisible: {
    right: 0,
    top: 0,
    height: Dimensions.get('screen').height,
  },
  topMask: {
    bottom: Dimensions.get('screen').height,
  },
  bottomMask: {
    top: -Dimensions.get('screen').height,
  },
  leftMask: {
    right: Dimensions.get('screen').width,
  },
  rightMask: {
    left: -Dimensions.get('screen').width,
  },
};
