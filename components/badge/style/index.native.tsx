import variables from '../../style/themes/default.native';

export default {
  textStyle: {
    flexDirection: 'row',
  },

  Shape: {
    height: 14,
  },

  dotBadge: {
    width: 8,
    height: 8,
    borderRadius: 1000,
    display: 'flex',
  },

  radiusBadge: {
    borderRadius: 4,
    height: 16,
  },

  roundBadge: {
    borderRadius: variables.badge_dot_diameter,
    height: 16,
  },

  circleBadge: {
    borderRadius: 1000,
    height: 16,
  },

  leafBadge: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
    height: 16,
  },

  dotSup: {
    position: 'absolute',
    top: -4,
  },

  radiusSup: {
    position: 'absolute',
    top: -4,
  },

  roundSup: {
    position: 'absolute',
    top: -4,
  },

  circleSup: {
    position: 'absolute',
    top: -4,
  },

  leafSup: {
    position: 'absolute',
    top: -4,
  },

  errorBagde: {
    backgroundColor: variables.theme_error,
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

  dotText: {
    color: 'white',
    display: 'flex',
    fontSize: variables.badge_font_size,
    lineHeight: 14,
    paddingHorizontal: variables.padding_h_sm,
  },
};
