import variables from '../../style/themes/default.native';

export default {
  wrapper: {
    position: 'relative',
    minHeight: variables.swipe_action_height,
    backgroundColor: variables.swipe_action_background,
  },
  content: {
    flex: 1,
    position: 'relative',
    backgroundColor: variables.swipe_action_background,
  },
  btn: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
  textStyle: {
    color: variables.color_text_inverse,
    fontSize: variables.button_font_size_sm,
  },
  leftBtn: {
    left: 0,
  },
  rightBtn: {
    right: 0,
  },
};
