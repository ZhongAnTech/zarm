import variables from '../../style/themes/default.native';

export default {
  messageWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: variables.message_height,
  },

  messageWrapperInner: {
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
    width: 10,
    marginLeft: 2,
  },

  closeIconWrapper: {
    position: 'relative',
    width: 10,
    height: 10,
  },

  closeIconLeft: {
    position: 'absolute',
    top: 5,
    width: 10,
    height: 1,
    transform: [{ rotate: '45deg' }],
  },

  closeIconRight: {
    position: 'absolute',
    top: 5,
    width: 10,
    height: 1,
    transform: [{ rotate: '135deg' }],
  },

  lgCloseIconWrapper: {
    position: 'relative',
    width: 12,
    height: 12,
  },

  lgCloseIconLeft: {
    position: 'absolute',
    top: 6,
    width: 12,
    height: 1,
    transform: [{ rotate: '45deg' }],
  },

  lgCloseIconRight: {
    position: 'absolute',
    top: 6,
    width: 12,
    height: 1,
    transform: [{ rotate: '135deg' }],
  },

  lgCloseWrapperStyle: {
    alignItems: 'center',
    width: 12,
    marginLeft: 2,
  },

  arrowStyle: {
    width: variables.message_arrow_length,
    height: variables.message_arrow_length,
    borderTopWidth: variables.message_arrow_border_width,
    borderRightWidth: variables.message_arrow_border_width,
    transform: [{ rotate: '45deg' }],
    marginLeft: 5,
    marginRight: 2,
    alignItems: 'center',
  },

  lgArrowStyle: {
    width: variables.message_arrow_length_lg,
    height: variables.message_arrow_length_lg,
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

  defaultCloseBg: {
    backgroundColor: variables.message_theme_text_default,
  },

  primaryCloseBg: {
    backgroundColor: variables.message_theme_text_primary,
  },

  successCloseBg: {
    backgroundColor: variables.message_theme_text_success,
  },

  warningCloseBg: {
    backgroundColor: variables.message_theme_text_warning,
  },

  errorCloseBg: {
    backgroundColor: variables.message_theme_text_error,
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
