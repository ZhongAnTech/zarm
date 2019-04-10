import variables from '../../style/themes/default.native';

export default {
  textStyle: {
    flexDirection: 'row',
  },

  dotBadge: {
    width: variables.badge_dot_diameter,
    height: variables.badge_dot_diameter,
    borderRadius: variables.badge_dot_diameter,
  },

  radiusBadge: {
    borderRadius: variables.badge_rect_radius,
    height: variables.badge_height,
  },

  roundBadge: {
    borderRadius: variables.badge_dot_diameter,
    height: variables.badge_height,
  },

  rectBadge: {
    height: variables.badge_height,
  },

  circleBadge: {
    borderRadius: variables.badge_dot_diameter,
    height: variables.badge_height,
  },

  leafBadge: {
    borderTopLeftRadius: variables.badge_dot_diameter,
    borderTopRightRadius: variables.badge_dot_diameter,
    borderBottomRightRadius: variables.badge_dot_diameter,
    height: variables.badge_height,
  },

  sup: {
    position: 'absolute',
    top: variables.badge_sup_top,
  },

  dangerBagde: {
    backgroundColor: variables.theme_danger,
  },

  successBagde: {
    backgroundColor: variables.theme_success,
  },

  warningBagde: {
    backgroundColor: variables.theme_warning,
  },

  primaryBagde: {
    backgroundColor: variables.theme_primary,
  },

  defaultBagde: {
    backgroundColor: variables.theme_default,
  },

  badgeText: {
    color: variables.badge_text_color,
    display: 'flex',
    fontSize: variables.badge_font_size,
    lineHeight: variables.badge_height,
    paddingHorizontal: variables.badge_padding_h,
  },

  dotText: {
    width: 0,
  },
};
