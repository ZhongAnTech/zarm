import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import panelStyle from './style/index.native';
import { BasePanelHeaderProps } from './PropsType';

export interface PanelHeaderProps extends BasePanelHeaderProps {
  style?: CSSProperties;
  styles?: typeof panelStyle;
}

const ChangeComponent = props => {
  const component = props.component;
  if (React.isValidElement(component)) {
    return component;
  } else {
    return <Text style={panelStyles.panelHeaderTitleText}>{component}</Text>;
  }
};

const panelStyles = StyleSheet.create<any>(panelStyle);

export default class PanelHeader extends PureComponent<PanelHeaderProps, {}> {

  static defaultProps = {
    prefixCls: 'za-panel',
    styles: panelStyles,
  };

  render() {
    const { title, more, style, styles } = this.props;

    const wrapperStyle = [
      styles!.panelHeader,
      style,
    ] as ViewStyle;

    return (
      <View style={wrapperStyle}>
        {title && <View style={panelStyles.panelHeaderTitle}><ChangeComponent type="title" component={title}/></View>}
        {more && <View style={panelStyles.panelHeaderMore}><ChangeComponent type="more" component={more}/></View>}
      </View>
    );
  }
}
