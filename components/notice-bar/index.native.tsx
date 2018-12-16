import React, { PureComponent, CSSProperties } from 'react';
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  UIManager,
  ScrollView,
  findNodeHandle,
} from 'react-native';
import PropsType from './PropsType';
import noticeBarStyle from './style/index.native';
import Message from '../message';

export interface NoticeBarProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof noticeBarStyle;
}

const noticeBarStyles = StyleSheet.create<any>(noticeBarStyle);

export default class NoticeBar extends PureComponent<NoticeBarProps, any> {
  static defaultProps = {
    theme: 'warning',
    hasArrow: false,
    closable: false,
    scrollable: false,
    styles: noticeBarStyles,
  };

  private content;
  private wrapper;
  private moveInterval;

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  async componentDidMount() {
    const { scrollable } = this.props;
    if (!scrollable) {
      return;
    }

    const asyncWrapper = this.layout(this.wrapper);
    const asyncContent = this.layout(this.content);
    let wrapperWidth = await asyncWrapper;
    let contentWidth = await asyncContent;

    const distance = wrapperWidth - contentWidth;
    if (distance > 0) {
      return;
    }
    let delay = 1000;
    this.moveInterval = setInterval(() => {
      let { offset } = this.state;
      if ((offset < distance || offset >= 0) && delay > 0) {
        delay -= 50;
        return;
      }
      delay = 1000;
      offset = (offset < distance)
        ? 0
        : (offset - 1);

      this.setState({ offset });
    }, 50);
  }

  layout = (ref): Promise<number> => {
    const handle = findNodeHandle(ref);
    if (!handle) {
      return Promise.resolve(0);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          // x,y 当前container的坐标, width, height 是宽高, pageX, pageY 是在屏幕中的坐标（起始坐标）
          const result = {
            x,
            y,
            width,
            height,
            pageX,
            pageY,
          };
          resolve(result.width);
        });
      });
    });
  }

  componentWillUnmount() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  }

  render() {
    const {
      theme,
      scrollable,
      closable,
      styles,
      children,
      ...others } = this.props;

    const { offset } = this.state;

    const containerStyle = [
      styles![`${theme}NoticeBarBg`],
    ] as ViewStyle;

    const textStyle = [
      styles![`${theme}NoticeBarText`],
      styles!.noticeBarSize,
    ];

    const wrapperProps = {
      theme,
      scrollable,
      closable,
      children,
    };

    return scrollable ?
    <Message {...wrapperProps} {...others} size="lg">
      <ScrollView
        ref={view => { this.wrapper = view; }}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={containerStyle}>
          <Text
            ref={view => { this.content = view; }}
            style={[ textStyle, { left: offset } ]}
          >
            {children}
          </Text>
        </View>
      </ScrollView>
    </Message>
    : <Message {...wrapperProps} {...others} size="lg">{children}</Message>;
  }
}
