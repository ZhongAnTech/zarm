import Color from 'color';
import variables from '../../style/themes/default.native';

export default {
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: variables.message_min_height,
    paddingHorizontal: variables.message_padding_h,
    paddingVertical: variables.message_padding_v,
    backgroundColor: variables.message_theme_bg_primary,
  },
  primaryWrapper: {
    backgroundColor: `${Color(variables.theme_primary).alpha(0.1)}`,
  },
  successWrapper: {
    backgroundColor: `${Color(variables.theme_success).alpha(0.1)}`,
  },
  warningWrapper: {
    backgroundColor: `${Color(variables.theme_warning).alpha(0.1)}`,
  },
  dangerWrapper: {
    backgroundColor: `${Color(variables.theme_danger).alpha(0.1)}`,
  },

  headerStyle: {},

  bodyStyle: {
    flex: 1,
    flexDirection: 'row',
  },

  footerStyle: {
    flexDirection: 'row',
    paddingLeft: 10,
  },

  textStyle: {
    fontSize: variables.message_font_size,
  },
  primaryTextStyle: {
    color: variables.theme_primary,
  },
  successTextStyle: {
    color: variables.theme_success,
  },
  warningTextStyle: {
    color: variables.theme_warning,
  },
  dangerTextStyle: {
    color: variables.theme_danger,
  },

  // close icon
  closeIconWrapperStyle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 14,
    height: 20,
  },
  closeIconStyle: {
    position: 'absolute',
    height: 1,
    width: variables.message_close_length,
  },
  // close icon theme
  primaryCloseIconStyle: {
    backgroundColor: variables.theme_primary,
  },
  successCloseIconStyle: {
    backgroundColor: variables.theme_success,
  },
  warningCloseIconStyle: {
    backgroundColor: variables.theme_warning,
  },
  dangerCloseIconStyle: {
    backgroundColor: variables.theme_danger,
  },
  // close icon type
  closeIconLeft: {
    transform: [{ rotate: '45deg' }],
  },
  closeIconRight: {
    transform: [{ rotate: '135deg' }],
  },

  // arrow
  arrowWrapperStyle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 14,
    height: 20,
  },
  arrowStyle: {
    position: 'absolute',
    borderTopWidth: variables.message_arrow_border_width,
    borderRightWidth: variables.message_arrow_border_width,
    transform: [{ rotate: '45deg' }],
    width: variables.message_arrow_length,
    height: variables.message_arrow_length,
  },
  // arrow theme
  primaryArrowStyle: {
    borderTopColor: variables.theme_primary,
    borderRightColor: variables.theme_primary,
  },
  successArrowStyle: {
    borderTopColor: variables.theme_success,
    borderRightColor: variables.theme_success,
  },
  warningArrowStyle: {
    borderTopColor: variables.theme_warning,
    borderRightColor: variables.theme_warning,
  },
  dangerArrowStyle: {
    borderTopColor: variables.theme_danger,
    borderRightColor: variables.theme_danger,
  },
};
