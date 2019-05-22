import React, { isValidElement } from 'react';
import { View, Text } from 'react-native';

export const RenderWithText = (props) => {
  const { component, viewStyle, textStyle } = props;
  if (!component) {
    return null;
  }
  if (!isValidElement(component)) {
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{component}</Text>
      </View>
    );
  }
  return <View style={viewStyle}>{component}</View>;
};

export default RenderWithText;
