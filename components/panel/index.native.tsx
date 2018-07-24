import React, { PureComponent, CSSProperties, isValidElement } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { BasePanelProps } from './PropsType';
import panelStyle from './style/index.native';

export interface PanelProps extends BasePanelProps {
  style?: CSSProperties;
  styles?: typeof panelStyle;
}

const panelStyles = StyleSheet.create<any>(panelStyle);

const ChangeComponent = props => {
  const component = props.component;
  const viewStyle = (props.type === 'title')
    ? panelStyles.panelHeaderTitle
    : panelStyles.panelHeaderMore;

  const textStyle = (props.type === 'title')
    ? panelStyles.panelHeaderTitleText
    : panelStyles.panelHeaderMoreText;

  let contentRender = component;

  if (!isValidElement(component)) {
    contentRender = <Text style={textStyle}>{component}</Text>;
  }
  return <View style={viewStyle}>{contentRender}</View>;
};

export default class Panel extends PureComponent<PanelProps, {}> {
  static defaultProps = {
    styles: panelStyles,
  };

  render() {
    const { titleRender, moreRender, style, styles, children } = this.props;

    const wrapperStyle = [
      styles!.container,
      style,
    ] as ViewStyle;

    const headerStyle = [
      styles!.panelHeader,
    ] as ViewStyle;

    const bodyStyle = [
      styles!.panelBody,
    ] as ViewStyle;

    return (
      <View style={wrapperStyle}>
        <View style={headerStyle}>
          {titleRender && <ChangeComponent type="title" component={titleRender}/>}
          {moreRender && <ChangeComponent type="more" component={moreRender}/>}
        </View>
        <View style={bodyStyle}>
          {children}
        </View>
      </View>
    );
  }
}
