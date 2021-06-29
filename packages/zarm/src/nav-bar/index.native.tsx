/**
 * 目前用于 modal 的导航，提供简单的返回、确定
 * 一般页面跳转使用 react-navigation
 *
 * showRight: 是否展示右边按钮，默认展示
 * leftText：左边按钮文案
 * rightText： 右边按钮文案
 * onClickLeft： 左边按钮点击事件
 * onClickRight： 右边按钮点击事件
 */
import React, { CSSProperties, PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import type { BaseNavBarProps } from './interface';
import navBarStyle from './style/index.native';

export interface NavBarProps extends BaseNavBarProps {
  style?: CSSProperties;
  styles?: typeof navBarStyle;
}

const navBarStyles = StyleSheet.create<any>(navBarStyle);

const PADDING_TOP = Platform.OS === 'ios' ? 20 : 0;

export default class NavBar extends PureComponent<NavBarProps, any> {
  static defaultProps = {
    styles: navBarStyles,
    /* leftText: '返回',
    rightText: '确定',
    showRight: true, */
  };

  render() {
    const {
      styles,
      style,
      left,
      right,
      /* leftText,
      rightText,
      onClickLeft,
      onClickRight,
      showRight, */
    } = this.props;

    const navBarWrapperStyle = [
      styles!.navBarWrapper,
      style,
      {
        paddingTop: PADDING_TOP,
      },
    ] as ViewStyle;

    const leftBtn = (
      <TouchableOpacity>
        <Text style={[styles!.btn]}>{left}</Text>
      </TouchableOpacity>
    );

    const rightBtn = right ? (
      <TouchableOpacity>
        <Text style={[styles!.btn, styles!.rightBtn]}>{right}</Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles!.btn} />
    );

    return (
      <View>
        <StatusBar barStyle="default" />

        <View style={navBarWrapperStyle}>
          <View style={styles!.navBarBox as ViewStyle}>
            {leftBtn}

            <View style={styles!.titleWrapper}>
              <Text style={styles!.titleText as TextStyle}>Photos</Text>
            </View>

            {rightBtn}
          </View>
        </View>
      </View>
    );
  }
}
