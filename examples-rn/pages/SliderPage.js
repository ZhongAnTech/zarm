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

  onChange = (value) => {
    return value;
  }

  render() {
    return (
      <ScrollView>
        <Panel title="基本用法">
          <View style={[styles.box]}>
            <ZSlider value={this.state.value} onChange={this.onChange} />
          </View>
        </Panel>
        <Panel title="设置默认值">
          <View style={[styles.box]}>
            <ZSlider defaultValue={20} value={this.state.value} onChange={this.onChange} />
          </View>
        </Panel>
        <Panel title="设置上下限">
          <View style={[styles.box]}>
            <ZSlider value={this.state.value} onChange={this.onChange} min={-100} max={100} defaultValue={0} />
          </View>
        </Panel>
        <Panel title="设置步长">
          <View style={[styles.box]}>
            <ZSlider value={this.state.value} onChange={this.onChange} step={10} />
          </View>
        </Panel>
        <Panel title="禁用状态">
          <View style={[styles.box]}>
            <ZSlider value={this.state.value} onChange={this.onChange} defaultValue={20} disabled />
          </View>
        </Panel>
      </ScrollView>
    );
  }
}
