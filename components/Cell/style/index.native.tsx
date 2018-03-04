import variables from '../../style/themes/default.native';
import { PixelRatio, StyleSheet, ViewStyle } from 'react-native';
import absoluteFill = StyleSheet.absoluteFill;
export default {
  container: {
    flexDirection: 'column',
  } as ViewStyle,

  defaultWrap: {
    width: '100%',
    position: 'relative',
  },

  defaultInner: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },

  defaultTitle: {
    paddingTop: 12,
    paddingBottom: 12,
  },

  defaultBody: {
    justifyContent: 'center',
  },

  defaultFooter: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
    height: '100%',
  },

  defaultIcon: {
    width: 28,
    height: '100%',
    marginRight: 10,
    justifyContent: 'center',
  },

  defaultDes: {
    color: '#999',
  },
};
