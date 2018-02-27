import variables from '../../style/themes/default.native';
import { PixelRatio, ViewStyle } from 'react-native';
export default {
  container: {
    flexDirection: 'column',
  } as ViewStyle,

  panelHeader: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },
  panelHeaderTitle: {
    flex: 1,
  },
  panelHeaderTitleText: {
    fontSize: variables.panel_header_font_size,
    color: variables.color_text_caption,
  },
  panelHeaderMore: {

  },
  panelBody: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderStyle: 'solid',
    borderColor: '#dddddd',
    flex: 1,
  },
  panelFooter: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },
  panelFooterTitle: {
    flex: 1,
  },
  panelFooterTitleText: {
    fontSize: variables.panel_footer_font_size,
    color: variables.color_text_caption,
  },
  panelFooterMore: {
  },
};
