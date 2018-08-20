import variables from '../../style/themes/default.native';

export default {
  TextStyle: {
    flexDirection: 'row',
  },

  Shape: {
    height: 14,
  },

  dotShape: {
    width: 8,
    height: 8,
    borderRadius: 1000,
    display: 'flex',
  },

  dotSup: {
    width: 8,
    height: 8,
    position: 'absolute',
    top: -4,
  },

  radiusShape: {
    borderRadius: 4,
    height: 16,
  },

  radiusSup: {
    position: 'absolute',
    top: -4,
  },

  roundShape: {
    borderRadius: variables.badge_dot_diameter,
    height: 16,
  },

  roundSup: {
    position: 'absolute',
    top: -4,
  },

  circleShape: {
    borderRadius: 1000,
    height: 16,
  },

  circleSup: {
    position: 'absolute',
    top: -4,
  },

  leafShape: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
    height: 16,
  },

  leafSup: {
    position: 'absolute',
    top: -4,
  },

  errorTheme: {
    backgroundColor: variables.theme_error,
  },

  successTheme: {
    backgroundColor: variables.theme_success,
  },

  warningTheme: {
    backgroundColor: variables.theme_warning,
  },

  primaryTheme: {
    backgroundColor: variables.theme_primary,
  },

  defaultTheme: {
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
