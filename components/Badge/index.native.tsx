import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import classnames from 'classnames';
// 引入组件参数
import PropsType from './PropsType';
// 引入CSS
import badgeStyle from './style/index.native';

// 问号代表可选
// export default interface PropsType {
//   theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
//   shape?: 'dot' | 'radius' | 'round' | 'circle';
//   sup?: boolean;
//   text?: any;
// }

export interface BadgeProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof badgeStyle;
}

// 这里的意思是将传入两个参数，React.Component 的参数第一个是Props，第二个是 State，
// 然后利用typescript的类型检查，Props类型需要时上面定义的 BadgeProps中的可选参数中的变量名
// state这里传入任意都行

const badgeStyles = StyleSheet.create<any>(badgeStyle);

export default class Badge extends PureComponent<BadgeProps, {}> {

  static defaultProps = {
    prefixCls: 'za-badge',
    theme: 'error',
    sup: false,
    styles: badgeStyles,
  };

  state = {
    dotWidth: 0,
  };

  // 获取元素宽度设置style
  layout = (e) => {
    let dotWidth = -parseInt(e.layout.width, 10) / 2;
    this.setState({
      dotWidth,
    });
  }

  render() {
    const { styles } = this.props;

    const {
      prefixCls,
      theme,
      shape,
      sup,
      text,
      children,
      ...others,
    } = this.props;

    const bagdeWrapper = [
      styles!.TextStyle,
    ] as ViewStyle;

    const dotText = [
      styles!.dotText,
      styles![`${shape}Text`],
    ];

    const shapeStyle = [
      styles![`${shape}Shape`],
      styles![`${theme}Theme`],
      sup && styles![`${shape}Sup`],
    ] as ViewStyle;

    return (
      <View style={bagdeWrapper}>
        {children}
        <View
          onLayout={({ nativeEvent: e }) => this.layout(e)}
          style={[shapeStyle, { right: sup ? this.state.dotWidth : 0 }]}
        >
          <Text style={dotText}>{text}</Text>
        </View>
      </View>
    );
  }
}
