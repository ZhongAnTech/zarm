import variables from '../../style/themes/default.native';

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

  actionItemBorder: {
    borderTopWidth: 1,
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
