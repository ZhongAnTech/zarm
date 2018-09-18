import React, { PureComponent, CSSProperties } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ViewStyle,
    GestureResponderEvent,
} from 'react-native';
import PropsType from './PropsType';
import cellStyle from './style/index.native';

export interface CellProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof cellStyle;
  onClick?: (event: GestureResponderEvent) => void;
}

const cellStyles = StyleSheet.create<any>(cellStyle);

export default class Cell extends PureComponent<CellProps, any> {
  static defaultProps = {
    hasArrow: false,
    styles: cellStyles,
  };

  render() {
    const {
      hasArrow,
      icon,
      title,
      description,
      help,
      style,
      styles,
      onClick,
      children,
      ...others
    } = this.props;

    const wrapperStyle = [
      styles!.wrapperStyle,
      style,
    ] as ViewStyle;
    const cellContentStyle = [
      styles!.cellContentStyle,
    ] as ViewStyle;
    const cellLineContainerStyle = [
      styles!.cellLineLeft,
    ] as ViewStyle;
    const cellLineStyle = [
      styles!.cellLineStyle,
    ] as ViewStyle;
    const containerStyle = [
      styles!.containerStyle,
    ] as ViewStyle;
    const bodyStyle = [
      styles!.bodyStyle,
      description ? styles!.flexDirectionColumn : styles!.flexDirectionRow,
      description ? styles!.alignItemsStart : styles!.alignItemsCenter,
    ] as ViewStyle;
    const iconStyle = [
      styles!.iconStyle,
    ] as ViewStyle;
    const titleStyle = [
      children && description && styles!.paddingBottom,
    ] as ViewStyle;
    const arrowStyle = [
      styles!.arrowStyle,
    ] as ViewStyle;
    const helpStyle = [
      styles!.helpStyle,
    ] as ViewStyle;
    const contentStyle = [
      !onClick && wrapperStyle,
    ] as ViewStyle;

    const underlayColor = (StyleSheet.flatten(styles!.underlayColorStyle) as any).backgroundColor;

    const iconRender = icon && <View style={iconStyle}>{icon}</View>;
    const titleRender = title && (React.isValidElement(title)
    ? <View style={titleStyle}>{title}</View>
    : <View style={titleStyle}><Text>{title}</Text></View>);
    const descriptionRender = description && (React.isValidElement(description)
    ? <View>{description}</View>
    : <View><Text>{description}</Text></View>);
    const arrowRender = hasArrow && <View style={arrowStyle}/>;
    const helpRender = help && (React.isValidElement(help)
    ? <View style={helpStyle}>{help}</View>
    : <View style={helpStyle}><Text>{help}</Text></View>);
    const childrenRender = children
    && (React.isValidElement(children) ? children : <View><Text>{children}</Text></View>);
    const contentRender = <View style={wrapperStyle}>
      <View style={cellLineContainerStyle}>
        <View style={cellLineStyle}/>
      </View>
      <View style={cellContentStyle}>
        <View style={containerStyle}>
          {iconRender}
          <View style={bodyStyle}>
            {titleRender}
            {childrenRender}
          </View>
          {descriptionRender}
          {arrowRender}
        </View>
        {helpRender}
      </View>
    </View>;
    const wrapperProps = Object.assign({ stlye: contentStyle, onPress: onClick }, others);
    return onClick
      ? <TouchableHighlight {...wrapperProps} underlayColor={underlayColor}>{contentRender}</TouchableHighlight>
      : (contentRender);
  }
}
