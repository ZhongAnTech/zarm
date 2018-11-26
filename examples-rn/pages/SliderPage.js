import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import { ZSlider, Panel } from '../../components/index.native';

const styles = {
  box: {
    padding: 10,
    paddingBottom: 0,
  },
  mb: {
    marginBottom: 10,
  },
  mr: {
    marginRight: 10,
  },
  title: {
    color: 'gray',
    paddingLeft: 0,
    display: 'flex',
    height: 50,
    lineHeight: 50,
    fontSize: 16,
  },
};

export default class SliderPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <ScrollView>
        <Panel title="基本用法">
          <View style={[styles.box]}>
            <ZSlider
              value={this.state.value}
              onChange={(value) => {
                this.setState({ value });
              }}
            />
          </View>
        </Panel>
      </ScrollView>
    );
  }
}
