
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Panel, Icon, Radio } from '../../components';

import '../styles/pages/RadioPage';

class RadioPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      radio: 'a'
    }
  }

  render() {
    return (
      <div className="radio-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>基本样式</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Radio.Group value={this.state.radio} onChange={(value) => {
                console.log('radio to ' + value);
              }}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c">C</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>指定选中项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Radio.Group defaultValue="c" onChange={(value) => {
                console.log('radio to ' + value);
              }}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c">C</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>禁用指定项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Radio.Group value={this.state.radio} onChange={(value) => {
                console.log('radio to ' + value);
              }}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c" disabled>C</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>按钮样式</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Radio.Group type="button" value={this.state.radio} onChange={(value) => {
                console.log('radio to ' + value);
              }}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c" disabled>C</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>圆角按钮样式</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Radio.Group radius type="button" value={this.state.radio} onChange={(value) => {
                console.log('radio to ' + value);
              }}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c" disabled>C</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>通栏样式</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Radio.Group radius block type="button" value={this.state.radio} onChange={(value) => {
                console.log('radio to ' + value);
              }}>
              <Radio value="a">AAAAA</Radio>
              <Radio value="b">BBBBB</Radio>
              <Radio value="c" disabled>CCC</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </Panel.Body>
        </Panel>

      </div>
    );
  }
}

export default RadioPage;