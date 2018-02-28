import React, { PureComponent, CSSProperties } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import PropsType from './PropsType';
import actionsheetStyle from './style/index.native';
import Popup from '../Popup/index.native';

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

  renderActions = (action, index) => {
    const { styles } = this.props;
    const actionStyle = [
      styles!.actionItem,
      !!action.theme && styles![`theme-${action.theme}`],
    ];
    return (
      <TouchableOpacity
        key={+index}
        style={index !== 0 && styles!.actionItemBorder}
        onPress={action.onClick}
      >
        <Text style={actionStyle}>{action.text}</Text>
      </TouchableOpacity>
    );
  }

  renderCancel = () => {
    const { styles, spacing, shape, onCancel, cancelText } = this.props;
    const cancelWrapperStyle = [
      styles!.wrapperCacnel,
      styles![`${shape}Shape`],
    ];
    const cancelStyle = [
      styles!.actionItem,
    ];

    return (typeof onCancel === 'function') && (
      <TouchableOpacity style={cancelWrapperStyle} onPress={onCancel}>
        <Text style={cancelStyle as ViewStyle}>{cancelText}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { style, styles, shape, spacing, visible, onMaskClick, actions } = this.props;
    const wrapperStyle = [
      styles!.wrapper,
      spacing && styles!.wrapperSpacing,
      styles![`${shape}Shape`],
      style,
    ];

    const actionsStyle = [
      styles!.wrapperActions,
      styles![`${shape}Shape`],
      { margin: 0 },
    ];

    return (
      <Popup visible={visible} onMaskClick={onMaskClick}>
        <View style={wrapperStyle}>
          <View style={actionsStyle}>
            {actions.map(this.renderActions)}
          </View>
          {this.renderCancel()}
        </View>
      </Popup>
    );
  }
}
