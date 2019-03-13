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
    paddingHorizontal: variables.message_padding_h_md,
    backgroundColor: variables.message_theme_bg_primary,
  },

  lgMessageWrapper: {
    height: variables.message_height_lg,
    paddingHorizontal: variables.message_padding_h_lg,
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

  primaryMessageBg: {
    backgroundColor: variables.message_theme_bg_primary,
  },

  successMessageBg: {
    backgroundColor: variables.message_theme_bg_success,
  },

  warningMessageBg: {
    backgroundColor: variables.message_theme_bg_warning,
  },

  dangerMessageBg: {
    backgroundColor: variables.message_theme_bg_danger,
  },

  primaryMessageText: {
    color: variables.theme_primary,
  },

  successMessageText: {
    color: variables.theme_success,
  },

  warningMessageText: {
    color: variables.theme_warning,
  },

  dangerMessageText: {
    color: variables.theme_danger,
  },

  primaryCloseBg: {
    backgroundColor: variables.theme_primary,
  },

  successCloseBg: {
    backgroundColor: variables.theme_success,
  },

  warningCloseBg: {
    backgroundColor: variables.theme_warning,
  },

  dangerCloseBg: {
    backgroundColor: variables.theme_danger,
  },

  activeMessageText: {
    backgroundColor: variables.theme_primary,
  },

  messageTextSize: {
    fontSize: variables.message_font_size,
  },

  lgMessageTextSize: {
    fontSize: variables.message_font_size_lg,
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

  dangerMessageArrow: {
    borderTopColor: variables.theme_danger,
    borderRightColor: variables.theme_danger,
  },

};
