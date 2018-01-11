import variables from '../../style/themes/default.native';
import { ViewStyle } from 'react-native';

export default {
  container: {
    flexDirection: 'row',
  } as ViewStyle,
  wrapperStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: variables.button_font_size_md,
  },
  defaultTheme: {
    backgroundColor: variables.theme_default,
  },
  primaryTheme: {
    backgroundColor: variables.theme_primary,
  },
  mdSize: {
    height: variables.button_height_md,
    paddingLeft: variables.button_padding_h_md,
    paddingRight: variables.button_padding_h_md,
  },
  mdSizeText: {
    fontSize: variables.button_font_size_md,
    color: '#fff',
  },
  lgSize: {
    height: variables.button_height_lg,
    paddingLeft: variables.button_padding_h_lg,
    paddingRight: variables.button_padding_h_lg,
  },
  lgSizeText: {
    fontSize: variables.button_font_size_lg,
    color: '#fff',
  },
};
