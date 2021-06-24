import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import type { BasePanelProps } from './interface';
import panelStyle from './style/index.native';
import { RenderWithText } from '../utils/renderWithText.native';

export interface PanelProps extends BasePanelProps {
  style?: CSSProperties;
  styles?: typeof panelStyle;
}

const panelStyles = StyleSheet.create<any>(panelStyle);

export default class Panel extends PureComponent<PanelProps, {}> {
  static defaultProps = {
    styles: panelStyles,
  };

  render() {
    const { title, more, style, styles, children } = this.props;

    const wrapperStyle = [styles!.container, style] as ViewStyle;

    const headerStyle = [styles!.panelHeader] as ViewStyle;

    const bodyStyle = [styles!.panelBody] as ViewStyle;

    return (
      <View style={wrapperStyle}>
        <View style={headerStyle}>
          <RenderWithText
            component={title}
            viewStyle={panelStyles.panelHeaderTitle}
            textStyle={panelStyles.panelHeaderTitleText}
          />
          <RenderWithText
            component={more}
            viewStyle={panelStyles.panelHeaderMore}
            textStyle={panelStyles.panelHeaderMoreText}
          />
        </View>
        <View style={bodyStyle}>{children}</View>
      </View>
    );
  }
}
