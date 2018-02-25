import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import panelStyle from './style/index.native';
import { BasePanelFooterProps } from './PropsType';

export interface PanelFooterProps extends BasePanelFooterProps {
  style?: CSSProperties;
  styles?: typeof panelStyle;
}

const ChangeComponent = props => {
  const component = props.component;
  if (React.isValidElement(component)) {
    return component;
  } else {
    return <Text style={panelStyles.panelFooterTitleText}>{component}</Text>;
  }
};

const panelStyles = StyleSheet.create<any>(panelStyle);

export default class PanelFooter extends PureComponent<PanelFooterProps, {}> {

  static defaultProps = {
    prefixCls: 'za-panel',
    styles: panelStyles,
  };

  render() {
    const { title, more, style, styles } = this.props;

    const wrapperStyle = [
      styles!.panelFooter,
      style,
    ] as ViewStyle;

    return (
      <View style={wrapperStyle}>
        {title && <View style={panelStyles.panelFooterTitle}><ChangeComponent type="title" component={title} /></View>}
        {more && <View style={panelStyles.panelFooterMore}><ChangeComponent type="more" component={more} /></View>}
      </View>
    );
  }
}
