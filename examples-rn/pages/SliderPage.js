import React, { PureComponent } from 'react';
import { ScrollView, View, Slider, Text } from 'react-native';
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
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

const noop = () => {};

export default class Page extends PureComponent {
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
          <View style={[styles.box, styles.inline]}>
            {/* <ZSlider
              value={this.state.value}
              onChange={(value) => {
                console.log(value);
              }}
            /> */}
            <Text style={styles.text} >
              {this.state.value && +this.state.value.toFixed(3)}
            </Text>
            <Slider
              value={this.state.value}
              minimumValue={0}
              maximumValue={100}
              onValueChange={(value) => {
                this.setState({ value });
              }}
            />
          </View>
        </Panel>
      </ScrollView>
    );
  }
}
