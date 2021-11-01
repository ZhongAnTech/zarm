import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import PropsType from './interface';
import actionsheetStyle from './style/index.native';
import Popup from '../popup/index.native';

export interface ButtonProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof actionsheetStyle;
}

const actionsheetStyles = StyleSheet.create<any>(actionsheetStyle);

export default class ActionSheet extends PureComponent<ButtonProps, any> {
  static defaultProps = {
    visible: false,
    spacing: false,
    actions: [],
    cancelText: '取消',
    styles: actionsheetStyles,
  };

  state = {
    isActive: false,
    activeIndex: null,
  };

  onPressIn = (activeIndex) => {
    this.setState({ isActive: true, activeIndex });
  };

  onPressOut = (activeIndex) => {
    this.setState({ isActive: false, activeIndex });
  };

  renderActions = (action, index) => {
    const { styles } = this.props;
    const { isActive, activeIndex } = this.state;
    const actionMaskStyle = [
      // index !== 0 && styles!.actionItemBorder,
      styles!.actionItemMask,
      activeIndex === index && isActive && styles!.actionItemActive,
    ];
    const actionStyle = [styles!.actionItem, !!action.theme && styles![`theme-${action.theme}`]];

    return (
      <TouchableOpacity
        key={+index}
        activeOpacity={1}
        onPress={action.onClick}
        onPressIn={() => this.onPressIn(index)}
        onPressOut={() => this.onPressOut(index)}
      >
        <View style={actionMaskStyle as ViewStyle} />
        {index !== 0 ? <View style={styles!.actionItemBorder} /> : null}
        <Text style={actionStyle}>{action.text}</Text>
      </TouchableOpacity>
    );
  };

  renderCancel = () => {
    const { styles, onCancel, cancelText } = this.props;
    const { isActive, activeIndex } = this.state;
    const cancelWrapperStyle = [styles!.wrapperCacnel];
    const cancelMaskStyle = [
      styles!.actionItemMask,
      isActive && activeIndex === 'cancel' && styles!.actionItemActive,
    ];
    const cancelStyle = [styles!.actionCancelItem];

    return (
      typeof onCancel === 'function' && (
        <TouchableOpacity
          style={cancelWrapperStyle}
          activeOpacity={1}
          onPress={onCancel}
          onPressIn={() => this.onPressIn('cancel')}
          onPressOut={() => this.onPressOut('cancel')}
        >
          <View style={cancelMaskStyle as ViewStyle} />
          <Text style={cancelStyle as ViewStyle}>{cancelText}</Text>
        </TouchableOpacity>
      )
    );
  };

  render() {
    const { style, styles, spacing, visible, onMaskClick, actions } = this.props;
    const wrapperStyle = [styles!.wrapper, spacing && styles!.wrapperSpacing, style];

    const actionsStyle = [styles!.wrapperActions, { margin: 0 }];

    return (
      <Popup visible={visible} onMaskClick={onMaskClick}>
        <View style={wrapperStyle as ViewStyle}>
          <View style={actionsStyle}>{actions!.map(this.renderActions)}</View>
          {this.renderCancel()}
        </View>
      </Popup>
    );
  }
}
