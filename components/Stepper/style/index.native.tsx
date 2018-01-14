import variables from '../../style/themes/default.native';
import { ViewStyle } from 'react-native';

export default {
  container: {
    flexDirection: 'row',
  } as ViewStyle,

  // base
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: variables.button_height_md,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: variables.stepper_button_width,
    height: variables.stepper_height,
    borderWidth: 1,
    borderColor: variables.theme_default,
  },
  buttonText: {
    fontSize: variables.stepper_button_font_size,
    color: variables.color_text,
  },
  input: {
    width: variables.stepper_input_width,
    height: variables.stepper_height,
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
    fontSize: variables.stepper_input_font_size,
    color: variables.color_text,
  },

  primaryButton: {
    borderColor: variables.theme_primary,
  },
  primaryButtonText: {
    color: variables.theme_primary,
  },

  // disabledButton
  disabledButton: {
    borderColor: variables.background_disabled,
  },
  disabledButtonText: {
    color: variables.color_text_disabled,
  },
};
