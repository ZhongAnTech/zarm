import variables from '../../style/themes/default.native';
import { PixelRatio, StyleSheet, ViewStyle } from 'react-native';
import absoluteFill = StyleSheet.absoluteFill;
export default {
  defaultWrap: {
    width: '100%',
    position: 'relative',
  },

  defaultInner: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  defaultHeader: {
    justifyContent: 'center',
  },

  defaultBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 10,
  },

  defaultFooter: {
    flex: 3,
    justifyContent: 'center',
    height: '100%',
    alignItems: 'flex-end',
  },

  defaultArrow: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: -5,
    marginLeft: 4,
  },

  defaultTitle: {
    paddingVertical: 12,
  },

  defaultIcon: {
    width: 28,
    marginRight: 10,
  },

  defaultDes: {
    color: '#999',
    alignItems: 'flex-end',
  },
};
