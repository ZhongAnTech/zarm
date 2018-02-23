import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import panelStyle from './style/index.native';
import { BasePanelHeaderProps } from './PropsType';

export interface PanelHeaderProps extends BasePanelHeaderProps {
    style?: CSSProperties;
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
  };

  render() {
    const { title, more, style } = this.props;

    const wrapperStyle = [
        panelStyles!.panelHeader,
        style,
    ] as any[];
    return (
      <View style={wrapperStyle}>
        {title && <View style={panelStyles.panelHeaderTitle}><ChangeComponent type="title" component={title}/></View>}
        {more && <View style={panelStyles.panelHeaderMore}><ChangeComponent type="more" component={more}/></View>}
      </View>
    );
  }
}
