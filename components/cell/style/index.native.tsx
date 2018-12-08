import variables from '../../style/themes/default.native';
import { StyleSheet } from 'react-native';

export default {
  wrapperStyle: {
    flex: 1,
    flexDirection: 'column',
    minHeight: variables.cell_height,
    backgroundColor: variables.cell_background,
  },
  activeWrapper: {
    backgroundColor: variables.background_active,
  },
  innerStyle: {
    flex: 1,
    flexDirection: 'column',
    marginTop: -1,
    paddingVertical: variables.cell_padding_v,
    paddingHorizontal: variables.cell_padding_h,
  },
  lineContainerStyle: {
    paddingLeft: variables.cell_line_padding_left,
  },
  lineStyle: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: variables.border_color,
  },
  contentStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  arrowStyle: {
    width: variables.cell_arrow_length,
    height: variables.cell_arrow_length,
    marginLeft: 5,
    borderTopWidth: variables.cell_arrow_border_width,
    borderTopColor: variables.cell_arrow_color,
    borderRightWidth: variables.cell_arrow_border_width,
    borderRightColor: variables.cell_arrow_color,
    transform: [{ rotate: '45deg' }],
  },
  iconStyle: {
    marginRight: variables.padding_h_md,
  },
  descriptionTextStyle: {
    color: variables.cell_description_color,
    fontSize: variables.cell_description_font_size,
  },
  titleViewStyle: {
    flex: 1,
  },
  labelTitleViewStyle: {
    flex: 0,
    width: variables.cell_label_width,
  },
  titleTextStyle: {
    color: variables.cell_title_color,
    fontSize: variables.cell_title_font_size,
    lineHeight: variables.cell_title_line_height,
  },
  helpViewStyle: {
    paddingTop: variables.padding_v_md,
  },
  helpTextStyle: {
    color: variables.cell_help_color,
    fontSize: variables.cell_help_font_size,
  },
  childrenViewStyle: {
    flex: 1,
    flexDirection: 'row',
  },
};
