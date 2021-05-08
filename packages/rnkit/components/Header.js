import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 16,
    color: '#383838',
  },
});

export default class Header extends PureComponent {
  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}
