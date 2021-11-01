import React, { PureComponent, CSSProperties } from 'react';
import { Text, StyleSheet, UIManager, ScrollView, findNodeHandle } from 'react-native';
import BaseNoticeBarProps from './interface';
import noticeBarStyle from './style/index.native';
import Message from '../message/index.native';

export interface NoticeBarProps extends BaseNoticeBarProps {
  style?: CSSProperties;
  styles?: typeof noticeBarStyle;
}

export interface NoticeBarState {
  offset: number;
}

const noticeBarStyles = StyleSheet.create<any>(noticeBarStyle);

export default class NoticeBar extends PureComponent<NoticeBarProps, NoticeBarState> {
  static defaultProps = {
    theme: 'warning',
    hasArrow: false,
    closable: false,
    speed: 50,
    delay: 2000,
    styles: noticeBarStyles,
  };

  private content;

  private wrapper;

  private moveInterval;

  constructor(props: NoticeBarProps) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  async componentDidMount() {
    const { delay, speed } = this.props;
    const asyncWrapper = this.layout(this.wrapper);
    const asyncContent = this.layout(this.content);
    const wrapperWidth = await asyncWrapper;
    const contentWidth = await asyncContent;

    const distance = wrapperWidth - contentWidth;
    if (distance > 0) {
      return;
    }
    let animateDelay = delay!;
    this.moveInterval = setInterval(() => {
      let { offset } = this.state;
      if ((offset < distance || offset >= 0) && animateDelay > 0) {
        animateDelay -= speed!;
        return;
      }
      animateDelay = delay!;
      offset = offset < distance ? 0 : offset - 1;

      this.setState({ offset });
    }, 50);
  }

  componentWillUnmount() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
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
  };

  render() {
    const { theme, closable, styles, children, ...others } = this.props;

    const { offset } = this.state;

    const textStyle = [styles!.textStyle, styles![`${theme}TextStyle`]];

    const wrapperProps = {
      theme,
      closable,
      children,
    };

    return (
      <Message {...wrapperProps} {...others} size="lg">
        <ScrollView
          horizontal
          ref={(view) => {
            this.wrapper = view;
          }}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text
            ref={(view) => {
              this.content = view;
            }}
            style={[textStyle, { left: offset }]}
          >
            {children}
          </Text>
        </ScrollView>
      </Message>
    );
  }
}
