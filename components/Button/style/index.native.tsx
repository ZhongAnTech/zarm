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
  iconStyle: {
    marginRight: variables.button_padding_h_md / 2,
  },

  // theme
  defaultWrapper: {
    backgroundColor: variables.theme_default,
  },
  defaultActiveWrapper: {
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
  primaryActiveWrapper: {
    backgroundColor: '#0f9d6d',
  },
  primaryBorderedWrapper: {
    borderColor: variables.theme_primary,
  },
  primaryBorderedText: {
    color: variables.theme_primary,
  },

  // size
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
    paddingLeft: 0,
    paddingRight: 0,
  },

  // bordered
  borderedWrapper: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },

  // disabled
  disabledWrapper: {
    opacity: 0.5,
  },

  // active
  activeText: {
    opacity: 0.6,
  },
};
