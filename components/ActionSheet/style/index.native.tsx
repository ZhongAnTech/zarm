import variables from '../../style/themes/default.native';
import { PixelRatio } from 'react-native';

export default {
  wrapper: {
    margin: variables.actionsheet_margin,
  },

  wrapperSpacing: {
    margin: 10,
    marginTop: 0,
  },

  radiusShape: {
    borderRadius: variables.radius_md,
    overflow: 'hidden',
  },

  wrapperActions: {
    backgroundColor: variables.color_text_inverse,
  },

  wrapperCacnel: {
    backgroundColor: variables.color_text_inverse,
    marginTop: 7,
  },

  actionItem: {
    height: variables.actionsheet_item_height,
    lineHeight: variables.actionsheet_item_height,
    fontSize: variables.actionsheet_item_font_size,
    textAlign: 'center',
  },

  actionItemMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  actionItemActive: {
    backgroundColor: variables.background_active,
  },

  actionItemBorder: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ddd',
  },

  'theme-primary': {
    color: variables.theme_primary,
  },

  'theme-success': {
    color: variables.theme_success,
  },

  'theme-warning': {
    color: variables.theme_warning,
  },

  'theme-error': {
    color: variables.theme_error,
  },
};
