import variables from '../../style/themes/default.native';
import { StyleSheet } from 'react-native';

const border = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6E6E6',
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
        paddingRight: variables.collapse_padding_h,
        paddingLeft: variables.collapse_padding_h,
        backgroundColor: '#FFF', // 解决在android下overflow属性无效（使用背景色掩盖文字）
    },
    titleTextStyle: {
        fontSize: 15,
        color: '#464646',
    },
    titleTextDisabledStyle: {
        color: '#EEE',
    },
    titleArrowStyle: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#C2C2C2',
        width: 10,
        height: 10,
    },
    titleArrowDisabledStyle: {
        borderColor: '#EEE',
    },
    itemBodyStyle: {
        backgroundColor: '#FFF',
        padding: 15,
        ...border,
    },
};
