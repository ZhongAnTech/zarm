import variables from '../../style/themes/default.native';
import { ViewStyle } from 'react-native';

export default {
  container: {
    flexDirection: 'row',
  } as ViewStyle,

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

  // theme
  defaultWrapper: {
    backgroundColor: variables.theme_default,
  },
  defaultHighlight: {
    backgroundColor: '#c9c9c9',
  },
  defaultBorderedWrapper: {
    borderColor: variables.theme_default,
  },
  defaultText: {
    color: variables.color_text,
  },

  primaryWrapper: {
    backgroundColor: variables.theme_primary,
  },
  primaryHighlight: {
    backgroundColor: '#0f9d6d',
  },
  primaryBorderedWrapper: {
    borderColor: variables.theme_primary,
  },
  // primaryText: {
  //   color: variables.theme_primary,
  // },
  primaryBorderedText: {
    color: variables.theme_primary,
  },

  // size
  lgWrapper: {
    height: variables.button_height_lg,
    paddingLeft: variables.button_padding_h_lg,
    paddingRight: variables.button_padding_h_lg,
  },
  lgText: {
    fontSize: variables.button_font_size_lg,
  },
  smWrapper: {
    height: variables.button_height_sm,
    paddingLeft: variables.button_padding_h_sm,
    paddingRight: variables.button_padding_h_sm,
  },
  smText: {
    fontSize: variables.button_font_size_sm,
  },

  // shape
  radiusWrapper: {
    borderRadius: variables.radius_md,
  },
  roundWrapper: {
    borderRadius: variables.radius_round,
  },
  circleWrapper: {
    width: variables.button_height_md,
    borderRadius: variables.radius_round,
  },

  // bordered
  borderedWrapper: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },

};
