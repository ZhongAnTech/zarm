import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, ViewStyle, UIManager, Animated, Easing } from 'react-native';
import { BasePopupProps } from './interface';
import popupStyle from './style/index.native';
// import Mask from '../Mask';

export interface PopupProps extends BasePopupProps {
  style?: CSSProperties;
  styles?: typeof popupStyle;
}

const popupStyles = StyleSheet.create<any>(popupStyle);

export default class Popup extends PureComponent<PopupProps, any> {
  static defaultProps = {
    visible: false,
    mask: true,
    direction: 'bottom',
    stayTime: 3000,
    animationDuration: 200,
    destroy: true,
    styles: popupStyles,
  };

  constructor(props) {
    super(props);
    this.state = {
      // isMaskShow: props.visible || false,
      isPending: false,
      // isShow: false,
      animationState: 'enter',
      directionStyle: {},
      transfromStyle: {},
      translateValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { translateValue } = this.state;
    // const { visible } = this.props;
    translateValue.addListener((value) => {
      this.animationEnd(value);
    });
    // if (visible) {
    //   this.enter(this.props);
    //   this.setState({
    //     isShow: true,
    //   });
    // }
  }

  componentDidUpdate(nextProps) {
    const { props } = this;
    if (nextProps.visible !== props.visible) {
      if (props.visible) {
        this.enter();
      } else {
        this.leave();
      }
    }
  }

  componentWillUnmount() {
    const { translateValue } = this.state;
    translateValue.removeAllListeners();
  }

  enter = () => {
    const { direction = 'top', animationDuration } = this.props;
    let transfromStyle = {};
    let newValue;
    if (direction === 'bottom') {
      transfromStyle = { transform: [{ translateY: this.state.translateValue }] };
      newValue = this.state.directionStyle[direction];
    } else if (direction === 'top') {
      transfromStyle = { transform: [{ translateY: this.state.translateValue }] };
      newValue = -this.state.directionStyle[direction];
    } else if (direction === 'left') {
      transfromStyle = { transform: [{ translateX: this.state.translateValue }] };
      newValue = -this.state.directionStyle[direction];
    } else if (direction === 'right') {
      transfromStyle = { transform: [{ translateX: this.state.translateValue }] };
      newValue = this.state.directionStyle[direction];
    }
    this.setState({
      // isMaskShow: true,
      isPending: true,
      animationState: 'enter',
      transfromStyle,
    });

    Animated.timing(this.state.translateValue, {
      toValue: newValue,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    // if (stayTime > 0 && autoClose) {
    //   this.timer = setTimeout(() => {
    //     onMaskClick();
    //     clearTimeout(this.timer);
    //   }, stayTime);
    // }
  };

  leave = () => {
    const { animationDuration } = this.props;
    this.setState({
      animationState: 'leave',
      // isPending: false,
      // isMaskShow: visible || false,
    });
    Animated.timing(this.state.translateValue, {
      toValue: 0,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  animationEnd = (value) => {
    const { afterClose } = this.props;

    if (this.state.animationState === 'leave' && value.value === 0 && this.state.isPending) {
      this.setState({
        isPending: false,
      });
      if (typeof afterClose === 'function') {
        afterClose();
      }
    }
  };

  renderMask = () => {
    return null;
    // const { mask, maskType, onMaskClick, styles, direction } = this.props;
    // const { isMaskShow } = this.state;
    // const maskStyle = [
    //   styles![`${direction}Mask`],
    // ];
    // return mask && (
    //     <Mask
    //       visible={isMaskShow}
    //       type={maskType}
    //       onClose={onMaskClick}
    //       style={maskStyle}
    //     />
    //   );
  };

  onLayout = (e, direction, that) => {
    const directionStyle = {};
    UIManager.measure(e.target, (_x, _y, width, height) => {
      if (direction === 'bottom' || direction === 'top') {
        directionStyle[direction] = -height;
      } else {
        directionStyle[direction] = -width;
      }
      that.setState({ directionStyle });
      if (that.state.isShow) {
        that.enter();
        that.setState({ isShow: false });
      }
    });
  };

  render() {
    const { direction, styles, children, style } = this.props;
    const { directionStyle, transfromStyle } = this.state;

    const popupCls = [styles!.wrapperStyle, styles![`${direction}Wrapper`], style] as ViewStyle;

    const invisibleStyle = [
      styles!.invisibleWrapper,
      styles![`${direction}Invisible`],
    ] as ViewStyle;

    const popUpStyle = [popupCls, directionStyle, transfromStyle];

    return (
      <View style={invisibleStyle}>
        <Animated.View style={popUpStyle} onLayout={(e) => this.onLayout(e, direction, this)}>
          {children}
        </Animated.View>
        {this.renderMask()}
      </View>
    );
  }
}
