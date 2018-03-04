import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import cellStyle from './style/index.native';
import PropsType from './PropsType';

export interface CellProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof cellStyle;
}

const cellStyles = StyleSheet.create<any>(cellStyle);

export default class Cell extends PureComponent<CellProps, {}> {

  static defaultProps = {
    hasArrow: false,
    disabled: false,
    styles: cellStyles,
    theme: 'default',
    // theme: 'default',
    // icon: '',
    // title: '',
    // description: '',
    // help: '',
  };

  render() {
    const {
      theme,
      hasArrow,
      icon,
      title,
      description,
      help,
      // disabled,
      onClick,
      children,
      styles,
      style,
    } = this.props;

    const rightIconImg = require('../../examples/images/icons/right.png');
    const rightIcon = <Image source={rightIconImg} style={{ width: 15, height: 15 }}/>;
    const iconRender = icon && <View style={[styles![`${theme}Icon`]]}>{icon}</View>;
    const titleRender = title && <View style={[styles![`${theme}Title`], style]}><Text>{title}</Text></View>;
    const contentRender = children && <View style={styles![`${theme}Content`]}>{children}</View>;
    const arrowRender = hasArrow && <View style={styles![`${theme}Arrow`]}>{rightIcon}</View>;
    const helpRender = help && (
      <View style={styles![`${theme}Help`]}>
        {help}
      </View>);
    const viewMain = () => {
      return (
        <View style={styles![`${theme}Wrap`]}>
          <View style={styles![`${theme}Inner`]}>
            <View style={styles![`${theme}Header`]}>
              {iconRender}
            </View>
            <View style={styles![`${theme}Body`]}>
              {titleRender}
              {contentRender}
            </View>
            <View style={styles![`${theme}Footer`]}>
              <Text style={styles![`${theme}Des`]}>
                {description}
              </Text>
            </View>
            {arrowRender}
          </View>
          {helpRender}
        </View>
        );
    };

    if (onClick) {
      return (<TouchableHighlight onPress={onClick} style={{ width: '100%' }} underlayColor="rgba(0,0,0,0.1)">
          {viewMain()}
        </TouchableHighlight>
      );
    } else {
      return (
        viewMain()
      );
    }
  }
}
