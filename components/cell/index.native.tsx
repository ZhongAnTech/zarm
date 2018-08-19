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
import { BasePanelProps } from './PropsType';
import cellStyle from './style/index.native';

export interface CellProps extends BasePanelProps {
    style?: CSSProperties;
    styles?: typeof cellStyle;
}

const cellStyles = StyleSheet.create<any>(cellStyle);

export default class Cell extends PureComponent<CellProps, any> {
    static defaultProps = {
        active: false,
        styles: cellStyles,
        onClick() {},
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
            children,
            ...others,
        } = this.props;
        const { isActive } = this.state;

        const wrapperStyle = [
            styles.wrapperStyle,
            style
        ];
        const containerStyle = [
            styles.containerStyle
        ];
        const bodyStyle = [
            styles.bodyStyle,
            description ? styles.flexDirectionColumn : styles.flexDirectionRow,
            description ? styles.alignItemsStart : styles.alignItemsCenter
        ];
        const iconStyle = [
            styles.iconStyle,
        ];
        const titleStyle = [
            description && styles.paddingBottom
        ];
        const arrowStyle = [
            styles.arrowStyle
        ];
        const helpStyle = [
            styles.helpStyle
        ];
        const underlayColor = StyleSheet.flatten(styles.underlayColorStyle).backgroundColor;

        const iconRender = icon && <View style={iconStyle}>{icon}</View>;
        const titleRender = title && <View style={titleStyle}>{title}</View>;
        const descriptionRender = description && <View>{description}</View>;
        const arrowRender = hasArrow && <View style={arrowStyle}/>;
        const helpRender = help && <View style={helpStyle}>{help}</View>;
        const contentRender = <View style={!hasArrow && wrapperStyle}>
            <View style={containerStyle}>
                {iconRender}
                <View style={bodyStyle}>
                    {titleRender}
                    {children}
                </View>
                {descriptionRender}
                {arrowRender}
            </View>
            {helpRender}
        </View>
        const wrapperProps = Object.assign({ activeOpacity: 0.3, style: wrapperStyle, onPress: onClick, onPressIn: this.onPressIn, onPressOut: this.onPressOut }, others);
        return hasArrow
            ? <TouchableHighlight {...wrapperProps} underlayColor={underlayColor}>{contentRender}</TouchableHighlight>
            : (contentRender);
    }
}
