import { StyleSheet } from 'react-native';
import variables from '../../style/themes/default.native';

export default {
  container: {
    flexDirection: 'column',
  },

  panelHeader: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 7,
    paddingHorizontal: 15,
  },
  panelHeaderTitle: {
    flex: 1,
  },
  panelHeaderTitleText: {
    fontSize: variables.panel_header_font_size,
    color: variables.color_text_caption,
  },
  panelHeaderMore: {},
  panelBody: {
    backgroundColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    flex: 1,
  },
};
