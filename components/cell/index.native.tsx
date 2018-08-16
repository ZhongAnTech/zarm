import React, { PureComponent, CSSProperties } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    ViewStyle,
} from 'react-native';
import PropsType from './PropsType';
import cellStyle from './style/index.native';

export interface CellProps extends PropsType {
    style?: CSSProperties;
    styles?: typeof cellStyle;
}

const cellStyles = StyleSheet.create<any>(buttonStyle);
export default class Cell extends PureComponent<CellProps, any> {
    static defaultProps = {
        theme: 'default',
        active: false,
        disabled: false,
        styles: cellStyles,
        onClick() { },
    };

    constructor(props) {
        super(props);
        this.state = {
            isActive: props.active,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('active' in nextProps) {
          this.setState({ isActive: nextProps.active });
        }
    }

    onPressIn = () => {
        this.setState({ isActive: true });
    }

    onPressOut = () => {
        this.setState({ isActive: false });
    }

    render() {
        const {
            theme,
            hasArrow,
            icon,
            title,
            description,
            help,
            disabled,
            style,
            styles,
            onClick,
            children
            ...others,
        } = this.props;
        const { isActive } = this.state;

        const wrapperStyle = [
            styles.wrapperStyle,
        ];
        const containerStyle = [
            styles.containerStyle,
        ];
        const bodyStyle = [
            styles.bodyStyle,
            description ? styles.flexDirectionColumn : styles.flexDirectionRow,
            description ? styles.alignItemsStart : styles.alignItemsCenter,
        ];
        const iconStyle = [
            styles.iconStyle,
        ];
        const titleStyle = [
            styles.titleStyle,
        ];
        const contentStyle = [
            styles.contentStyle,
        ];
        const arrowStyle = [
            styles.arrowStyle,
        ];
        const helpStyle = [
            styles.helpStyle,
        ];

        const iconRender = icon && <View style={iconStyle}>{icon}</View>;
        const titleRender = title && <View style={titleStyle}><Text style={styles.titleTextStyle}>{title}</Text></View>;
        const contentRender = children && <View style={contentStyle}>{children}</View>;
        // <Text style={styles.descriptionTextStyle}>{description}</Text>
        const descriptionRender = description && <View>{description}</View>;
        const arrowRender = hasArrow && <View style={arrowStyle}/>;
        const helpRender = help && <View style={helpStyle}><Text style={styles.helpTextStyle}>{help}</Text></View>;
        return (
            <View style={wrapperStyle}>
                <View style={containerStyle}>
                    {iconRender}
                    <View style={bodyStyle}>
                        {titleRender}
                        {contentRender}
                    </View>
                    {descriptionRender}
                    {arrowRender}
                </View>
                {helpRender}
            </View>
        );
    }
}
