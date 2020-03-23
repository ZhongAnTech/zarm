import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Stepper } from '../../components/index.native';

const styles = {
  mb: {
    marginBottom: 10,
  },
};

export default class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  render() {
    const { value } = this.state;

    return (
      <View style={{ padding: 15 }}>
        <Stepper style={styles.mb} value={value} onChange={(v) => console.log(v)} />
        <Stepper style={styles.mb} defaultValue={2} />
        <Stepper style={styles.mb} max={3} min={-3} />
        <Stepper style={styles.mb} step={5} />
        <Stepper style={styles.mb} disabled />
        <Stepper style={styles.mb} shape="radius" />
        <Stepper style={styles.mb} shape="circle" />
      </View>
    );
  }
}
