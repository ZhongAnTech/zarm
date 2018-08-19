import variables from '../../style/themes/default.native';
export default {
    wrapperStyle: {
        flex: 1,
        flexDirection: 'column',
        minHeight: variables.cell_height,
        backgroundColor: variables.cell_background,
        paddingTop: variables.cell_padding_h,
        paddingRight: variables.cell_padding_h,
        paddingBottom: variables.cell_padding_h,
        paddingLeft: variables.cell_padding_h,
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyStyle: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrowStyle: {
        width: 14,
        height: 14,
        borderTopWidth: 1,
        borderTopColor: '#BCBCBC',
        borderRightWidth: 1,
        borderRightColor: '#BCBCBC',
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
        maxWidth: variables.cell_icon_width,
        maxHeight: variables.cell_icon_height,
        marginRight: variables.padding_v_md,
    },
    descriptionStyle: {
        color: variables.cell_description_color,
        fontSize: variables.cell_description_font_size
    },
    titleStyle: {
        color: variables.cell_title_color,
        fontSize: variables.cell_title_font_size
    },
    helpStyle: {
        paddingTop: variables.padding_v_md,
    },
    underlayColorStyle: {
        backgroundColor: variables.background_active,
    }
};
