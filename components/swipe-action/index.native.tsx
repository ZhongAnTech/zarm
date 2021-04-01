import React, { PureComponent, cloneElement } from 'react';
import { View, PanResponder, Animated, StyleSheet } from 'react-native';
import PropsType from './PropsType';
import swipeActionStyle from './style/index.native';

const styles = StyleSheet.create<any>(swipeActionStyle);

export type SwipeActionProps = PropsType;

export default class SwipeAction extends PureComponent<SwipeActionProps, any> {
  private isOpen = false;

  private touchEnd = true;

  private btnsLeftWidth = 0;

  private btnsRightWidth = 0;

  private startTime;

  private offsetLeft;

  private panResponder;

  static defaultProps = {
    left: [],
    right: [],
    moveDistanceRatio: 0.5,
    moveTimeSpan: 300,
    animationDuration: 300,
    offset: 10,
    autoClose: true,
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.offsetLeft = new Animated.Value(0);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease,
    });
  }

  handleStartPanResponder = () => {
    if (this.isOpen) {
      this.touchEnd = false;
      this.close();
      return false;
    }
    this.startTime = new Date();
    this.touchEnd = true;
    return true;
  };

  handlePanResponderMove = (_event, { dx, dy }) => {
    const { disabled } = this.props;

    if (!this.touchEnd || disabled) {
      return;
    }

    // 拖动距离达到上限
    const { offset } = this.props;

    if (
      (dx > 0 && (!this.btnsLeftWidth || dx >= this.btnsLeftWidth + offset)) ||
      (dx < 0 && (!this.btnsRightWidth || dx <= -this.btnsRightWidth - offset))
    ) {
      return false;
    }

    // 判断滚屏情况
    const distanceX = Math.abs(dx);
    const distanceY = Math.abs(dy);
    if (distanceX < 5 || (distanceX >= 5 && distanceY >= 0.3 * distanceX)) {
      return false;
    }

    this.doTransition({ offsetLeft: dx, animationDuration: 0 });
  };

  handlePanResponderRelease = (_event, { dx }) => {
    const { animationDuration, moveDistanceRatio, moveTimeSpan } = this.props;
    const timeSpan = new Date().getTime() - this.startTime.getTime();

    let distanceX = 0;
    let isOpen = false;

    if (dx / this.btnsLeftWidth > moveDistanceRatio || (dx > 0 && timeSpan <= moveTimeSpan)) {
      distanceX = this.btnsLeftWidth;
      isOpen = true;
    } else if (
      dx / this.btnsRightWidth < -moveDistanceRatio ||
      (dx < 0 && timeSpan <= moveTimeSpan)
    ) {
      distanceX = -this.btnsRightWidth;
      isOpen = true;
    }

    if (isOpen && !this.isOpen) {
      // 打开
      this.open(distanceX);
    } else if (!isOpen && this.isOpen) {
      // 关闭
      this.close();
    } else {
      // 还原
      this.doTransition({ offsetLeft: distanceX, animationDuration });
    }
  };

  getBtnsWidth = ({ nativeEvent }, direction) => {
    const {
      layout: { width },
    } = nativeEvent;

    if (direction === 'left') {
      this.btnsLeftWidth = width;
    } else {
      this.btnsRightWidth = width;
    }
  };

  open = (offsetLeft) => {
    const { animationDuration, onOpen } = this.props;
    this.isOpen = true;
    this.doTransition({ offsetLeft, animationDuration });
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  close = () => {
    const { animationDuration, onClose } = this.props;
    this.isOpen = false;
    this.doTransition({ offsetLeft: 0, animationDuration });
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  doTransition = ({ offsetLeft, animationDuration }) => {
    Animated.timing(this.offsetLeft, {
      toValue: offsetLeft,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  renderButton = (button, index) => {
    return cloneElement(button, {
      key: +index,
      styles: {
        ...button.props.styles,
        ...StyleSheet.create({
          textStyle: swipeActionStyle.textStyle,
        }),
      },
      onClick: (e) => {
        const { onClick } = button.props;

        if (onClick) {
          onClick(e);
        }

        if (this.props.autoClose) {
          this.close();
        }
      },
    });
  };

  renderButtons = (buttons, direction) => {
    if (!buttons || buttons.length === 0) {
      return;
    }
    const btnStyle = [styles.btn, styles[`${direction}Btn`]];
    return (
      <View style={btnStyle} onLayout={(e) => this.getBtnsWidth(e, direction)}>
        {buttons.map(this.renderButton)}
      </View>
    );
  };

  render() {
    const viewStyle = {
      transform: [
        {
          translateX: this.offsetLeft,
        },
      ],
    };
    const { left, right, children } = this.props;
    return left || right ? (
      <View style={styles.wrapper}>
        {this.renderButtons(left, 'left')}
        {this.renderButtons(right, 'right')}
        <Animated.View style={[styles.content, viewStyle]} {...this.panResponder.panHandlers}>
          {children}
        </Animated.View>
      </View>
    ) : (
      children
    );
  }
}
