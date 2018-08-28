import variables from '../../style/themes/default.native';

export default {
  container: {
    flexDirection: 'row',
  },

  // base
  wrapperStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: variables.button_height_md,
    paddingLeft: variables.button_padding_h_md,
    paddingRight: variables.button_padding_h_md,
  },
  textStyle: {
    fontSize: variables.button_font_size_md,
    color: variables.color_text_inverse,
  },
  iconStyle: {
    marginRight: variables.button_padding_h_md / 2,
  },

  primaryWrapper: {
    backgroundColor: variables.theme_primary,
  },
  primaryActiveWrapper: {
    backgroundColor: variables.button_primary_active_bg,
  },
  primaryGhostWrapper: {
    borderColor: variables.theme_primary,
  },
  primaryGhostText: {
    color: variables.theme_primary,
  },
  primaryGhostActiveWrapper: {
    borderColor: variables.button_primary_ghost_active_color,
  },
  primaryGhostActiveText: {
    color: variables.button_primary_ghost_active_color,
  },

  successWrapper: {
    backgroundColor: variables.theme_success,
  },
  successActiveWrapper: {
    backgroundColor: variables.button_success_active_bg,
  },
  successGhostWrapper: {
    borderColor: variables.theme_success,
  },
  successGhostText: {
    color: variables.theme_success,
  },
  successGhostActiveWrapper: {
    borderColor: variables.button_success_ghost_active_color,
  },
  successGhostActiveText: {
    color: variables.button_success_ghost_active_color,
  },

  warningWrapper: {
    backgroundColor: variables.theme_warning,
  },
  warningActiveWrapper: {
    backgroundColor: variables.button_warning_active_bg,
  },
  warningGhostWrapper: {
    borderColor: variables.theme_warning,
  },
  warningGhostText: {
    color: variables.theme_warning,
  },
  warningGhostActiveWrapper: {
    borderColor: variables.button_warning_ghost_active_color,
  },
  warningGhostActiveText: {
    color: variables.button_warning_ghost_active_color,
  },

  errorWrapper: {
    backgroundColor: variables.theme_error,
  },
  errorActiveWrapper: {
    backgroundColor: variables.button_error_active_bg,
  },
  errorGhostWrapper: {
    borderColor: variables.theme_error,
  },
  errorGhostText: {
    color: variables.theme_error,
  },
  errorGhostActiveWrapper: {
    borderColor: variables.button_error_ghost_active_color,
  },
  errorGhostActiveText: {
    color: variables.button_error_ghost_active_color,
  },

  // size
  mdWrapper: {
    height: variables.button_height_md,
    paddingLeft: variables.button_padding_h_md,
    paddingRight: variables.button_padding_h_md,
  },
  mdCircleWrapper: {
    width: variables.button_height_md,
  },
  mdText: {
    fontSize: variables.button_font_size_md,
  },
  mdIcon: {
    marginRight: variables.button_padding_h_md / 2,
  },
  lgWrapper: {
    height: variables.button_height_lg,
    paddingLeft: variables.button_padding_h_lg,
    paddingRight: variables.button_padding_h_lg,
  },
  lgCircleWrapper: {
    width: variables.button_height_lg,
  },
  lgText: {
    fontSize: variables.button_font_size_lg,
  },
  lgIcon: {
    marginRight: variables.button_padding_h_lg / 2,
  },
  smWrapper: {
    height: variables.button_height_sm,
    paddingLeft: variables.button_padding_h_sm,
    paddingRight: variables.button_padding_h_sm,
  },
  smCircleWrapper: {
    width: variables.button_height_sm,
  },
  smText: {
    fontSize: variables.button_font_size_sm,
  },
  smIcon: {
    marginRight: variables.button_padding_h_sm / 2,
  },
  xsWrapper: {
    height: variables.button_height_xs,
    paddingLeft: variables.button_padding_h_xs,
    paddingRight: variables.button_padding_h_xs,
  },
  xsCircleWrapper: {
    width: variables.button_height_xs,
  },
  xsText: {
    fontSize: variables.button_font_size_xs,
  },
  xsIcon: {
    marginRight: variables.button_padding_h_xs / 2,
  },

  // shape
  radiusWrapper: {
    borderRadius: variables.radius_md,
  },
  rectWrapper: {
    borderRadius: 0,
  },
  roundWrapper: {
    borderRadius: variables.radius_round,
  },
  circleWrapper: {
    width: variables.button_height_md,
    borderRadius: variables.radius_round,
    paddingLeft: 0,
    paddingRight: 0,
  },

  // ghost
  ghostWrapper: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },

  // disabled
  disabledWrapper: {
    opacity: 0.5,
  },

  // disabled ghost
  disabledGhostWrapper: {
    borderColor: variables.button_disabled_ghost_color,
    opacity: 1,
  },

  // disabled ghost text
  disabledGhostText: {
    color: variables.button_disabled_ghost_color,
  },

  // active
  activeText: {
    opacity: 1,
  },
};
