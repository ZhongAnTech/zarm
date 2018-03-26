import variables from '../../style/themes/default.native';

export default {
  container: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: variables.stepper_height,
    height: variables.stepper_height,
    borderWidth: 1,
    borderColor: variables.theme_primary,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: variables.stepper_button_font_size,
    color: variables.theme_primary,
    marginBottom: 2,
  },
  input: {
    width: variables.stepper_input_width,
    height: variables.stepper_height,
    padding: 0,
    marginHorizontal: 10,
    fontSize: variables.stepper_input_font_size,
    color: variables.color_text,
    textAlign: 'center',
  },

  // shape
  radiusButton: {
    borderRadius: variables.radius_md,
  },
  circleButton: {
    borderRadius: variables.stepper_height,
  },

  // disabled
  disabledButton: {
    borderColor: variables.background_disabled,
  },
  disabledText: {
    color: variables.color_text_disabled,
  },
};
