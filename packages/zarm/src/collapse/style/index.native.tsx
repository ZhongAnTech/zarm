import { StyleSheet } from 'react-native';
import variables from '../../style/themes/default.native';

const border = {
  borderBottomWidth: StyleSheet.hairlineWidth,
  // borderBottomWidth: 1,
  borderBottomColor: variables.theme_default,
  borderStyle: 'solid',
};

export default {
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  // base
  itemWrapperStyle: {
    width: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  titleWrapperStyle: {
    backgroundColor: '#FFF',
    height: variables.collapse_height,
  },
  titleInnerStyle: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF', // 解决在android下overflow属性无效（使用背景色掩盖文字）
    marginLeft: variables.collapse_padding,
    paddingRight: variables.collapse_padding,
    ...border,
  },
  titleTextStyle: {
    fontSize: 15,
    color: '#464646',
  },
  titleTextDisabledStyle: {
    color: '#999',
  },
  titleArrowStyle: {
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: variables.collapse_arrow_color,
    width: 10,
    height: 10,
    position: 'relative',
  },
  titleArrowDisabledStyle: {
    borderColor: variables.collapse_arrow_disabled_color,
  },
  itemBodyStyle: {
    backgroundColor: '#FFF',
    marginLeft: variables.collapse_padding,
    paddingRight: variables.collapse_padding,
    paddingTop: variables.collapse_padding,
    paddingBottom: variables.collapse_padding,
    ...border,
  },
};
