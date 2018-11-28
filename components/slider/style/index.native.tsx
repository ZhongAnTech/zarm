import variables from '../../style/themes/default.native';

export default {
  container: {
    position: 'relative',
  },
  tooltipBox: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: - (variables.slider_tooltip_width / 2 - 18),
    top: -40,
  },
  tooltipContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: variables.slider_tooltip_width,
    height: variables.slider_tooltip_height,
    backgroundColor: variables.color_text,
    borderRadius: variables.radius_md,
  },
  tooltipTriangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderLeftColor: variables.slider_transparent,
    borderRightWidth: 8,
    borderRightColor: variables.slider_transparent,
    borderTopWidth: 8,
    borderTopColor: variables.color_text,
  },
  tooltipText: {
    color: variables.slider_handle_background,
    fontSize: variables.slider_handle_size / 2,
  },
};
