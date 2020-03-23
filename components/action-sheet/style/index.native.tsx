import { StyleSheet } from 'react-native';
import variables from '../../style/themes/default.native';

export default {
  wrapper: {
    margin: variables.actionSheet_margin,
  },

  wrapperSpacing: {
    margin: 10,
    marginTop: 0,
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
    height: variables.actionSheet_item_height,
    lineHeight: variables.actionSheet_item_height,
    fontSize: variables.actionSheet_item_font_size,
    textAlign: 'center',
  },

  actionCancelItem: {
    height: variables.actionSheet_item_height,
    lineHeight: variables.actionSheet_item_height,
    fontSize: variables.actionSheet_item_font_size,
    textAlign: 'center',
    color: variables.color_text_caption,
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
    borderTopWidth: StyleSheet.hairlineWidth,
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

  'theme-danger': {
    color: variables.theme_danger,
  },
};
