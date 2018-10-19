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
  cellContentStyle: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: variables.cell_padding_h,
    paddingRight: variables.cell_padding_w,
    paddingBottom: variables.cell_padding_h,
    paddingLeft: variables.cell_padding_w,
  },
  cellLineLeft: {
    marginTop: -1,
    paddingLeft: variables.cell_line_left,
  },
  cellLineStyle: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: variables.border_color,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyStyle: {
    flex: 1,
    alignItems: 'center',
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
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  paddingBottom: {
    paddingBottom: variables.padding_v_md,
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  iconStyle: {
    marginRight: variables.padding_h_md,
  },
  descriptionTextStyle: {
    color: variables.cell_description_color,
    fontSize: variables.cell_description_font_size,
  },
  titleViewStyle: {
  },
  labelTitleViewStyle: {
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
  underlayColorStyle: {
    backgroundColor: variables.background_active,
  },
};
