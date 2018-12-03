import variables from '../../style/themes/default.native';

export default {

  messageWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: variables.message_height,
    paddingHorizontal: variables.message_padding_horizontal,
    backgroundColor: variables.message_theme_bg_default,
  },

  lgMessageWrapper: {
    height: variables.message_height_lg,
    paddingHorizontal: variables.message_padding_horizontal_lg,
  },

  textBodyStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  wrapperStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerWrapperStyle: {
    flexDirection: 'row',
  },

  closeTextStyle: {
    lineHeight: variables.message_height,
    textAlign: 'right',
  },

  lgCloseTextStyle: {
    lineHeight: variables.message_height_lg,
    textAlign: 'right',
  },

  closeWrapperStyle: {
    alignItems: 'center',
    width: 24,
    marginLeft: 5,
  },

  lgCloseWrapperStyle: {
    alignItems: 'center',
    width: 30,
    marginLeft: 5,
  },

  arrowStyle: {
    width: variables.message_arrow_length,
    height: variables.message_arrow_length,
    borderTopWidth: variables.message_arrow_border_width,
    borderRightWidth: variables.message_arrow_border_width,
    transform: [{ rotate: '45deg' }],
    marginLeft: 5,
    alignItems: 'center',
  },

  textChildrenStyle: {
    flex: 1,
    flexDirection: 'row',
  },

  defaultMessageBg: {
    backgroundColor: variables.message_theme_bg_default,
  },

  primaryMessageBg: {
    backgroundColor: variables.message_theme_bg_primary,
  },

  successMessageBg: {
    backgroundColor: variables.message_theme_bg_success,
  },

  warningMessageBg: {
    backgroundColor: variables.message_theme_bg_warning,
  },

  errorMessageBg: {
    backgroundColor: variables.message_theme_bg_error,
  },

  defaultMessageText: {
    color: variables.message_theme_text_default,
  },

  primaryMessageText: {
    color: variables.message_theme_text_primary,
  },

  successMessageText: {
    color: variables.message_theme_text_success,
  },

  warningMessageText: {
    color: variables.message_theme_text_warning,
  },

  errorMessageText: {
    color: variables.message_theme_text_error,
  },

  activeMessageText: {
    backgroundColor: variables.message_theme_text_primary,
  },

  messageTextSize: {
    fontSize: variables.message_font_size,
  },

  lgMessageTextSize: {
    fontSize: variables.message_font_size_lg,
  },

  defaultMessageArrow: {
    borderTopColor: variables.theme_primary,
    borderRightColor: variables.theme_primary,
  },

  primaryMessageArrow: {
    borderTopColor: variables.theme_primary,
    borderRightColor: variables.theme_primary,
  },

  successMessageArrow: {
    borderTopColor: variables.theme_success,
    borderRightColor: variables.theme_success,
  },

  warningMessageArrow: {
    borderTopColor: variables.theme_warning,
    borderRightColor: variables.theme_warning,
  },

  errorMessageArrow: {
    borderTopColor: variables.theme_error,
    borderRightColor: variables.theme_error,
  },

};
