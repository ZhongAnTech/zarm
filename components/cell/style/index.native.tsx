import variables from '../../style/themes/default.native';
export default {
    wrapperStyle: {
        minWidth: 750,
        minHeight: 104,
        backgroundColor: '#FFFFFF',
        paddingTop: 28,
        paddingRight: 32,
        paddingBottom: 28,
        paddingLeft: 32,
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    bodyStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 40,
    },
    iconStyle: {
        minWidth: 48,
        minHeight: 48,
    },
    titleStyle: {
        minWidth: 151,
        minHeight: 40,
        color: '#464646',
        fontSize: 30,
        textAlign: 'left',
    },
    contentStyle: {
        minWidth: 539,
        minHeight: 40,
        color: '#909090',
        fontSize: 30,
        textAlign: 'right',
    },
    descriptionStyle: {
        color: '#909090',
        fontSize: 30,
        textAlign: 'left',
    },
    arrowStyle: {
        minWidth: 14,
        minHeight: 24,
        borderTopWidth: 1,
        borderTopColor: '#BCBCBC',
        borderRightWidth: 1,
        borderRightColor: '#BCBCBC',
        transform: [{ rotate: '45deg' }],
    },
    helpStyle: {
        color: '#FF5050',
        fontSize: 20,
        textAlign: 'left',
        minHeight: 28,
    },
};
