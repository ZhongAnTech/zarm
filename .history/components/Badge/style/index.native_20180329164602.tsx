import variables from '../../style/themes/default.native';

 // Badge
//  badge_height: 19,
//  badge_font_size: this.font_size_sm,
//  badge_padding_h: this.padding_h_sm,
//  badge_dot_diameter: 8,

export default {
  TextStyle: {
    flexDirection: 'row',
  },

  Shape: {
    height: 16,
  },

  dotShape: {
    width: 8,
    height: 8,
    borderRadius: 1000,
    display: 'flex',
  },

  dotSup: {
    position: 'absolute',
    top: -4,
  },

  radiusShape: {
    borderRadius: 4,
    height: 16,
  },

  radiusSup: {
    position: 'absolute',
    top: -8,
  },

  roundShape: {
    borderRadius: 16,
    height: 16,
  },

  roundSup: {
    position: 'absolute',
    top: -8,
  },

  circleShape: {
    borderRadius: 1000,
    height: 16,
  },

  circleSup: {
    position: 'absolute',
    top: -8,
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
    fontSize: 20,
    lineHeight: 16,
    paddingHorizontal: 4,
  },
};
