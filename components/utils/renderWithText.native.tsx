import React, { isValidElement } from 'react';
import { View, Text } from 'react-native';

export const RenderWithText = ({ component, viewStyle, textStyle }) => {
  if (!component) {
    return null;
  }
  if (!isValidElement(component)) {
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{component}</Text>
      </View>
    );
  } else {
    return <View style={viewStyle}>{component}</View>;
  }
};
