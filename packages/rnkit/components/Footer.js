import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  copyrightCn: {
    fontSize: 14,
    color: '#cccccc',
  },
  copyrightEn: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 3,
  },
});

export default class Footer extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.copyrightCn}>众安 · 体验设计中心</Text>
        <Text style={styles.copyrightEn}>Zhongan UX Densign</Text>
      </View>
    );
  }
}
