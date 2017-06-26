import React, { PureComponent } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Radio } from '../../components';
import '../styles/pages/RadioPage';

class Page extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      radio: '0',
    };
  }

  render() {
    return (
      <div className="radio-page">
        <Header title="单选框 Radio" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body className="radio-buttons">
              <Cell
                description={
                  <Radio.Group
                    value={this.state.radio}
                    onChange={value => console.log(`radio to ${value}`)}>
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2">选项三</Radio>
                  </Radio.Group>
                }>普通</Cell>

              <Cell
                description={
                  <Radio.Group
                    defaultValue="1"
                    onChange={value => console.log(`radio to ${value}`)}>
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2">选项三</Radio>
                  </Radio.Group>
                }>指定默认值</Cell>

              <Cell
                description={
                  <Radio.Group
                    value={this.state.radio}
                    onChange={value => console.log(`radio to ${value}`)}>
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2" disabled>选项三</Radio>
                  </Radio.Group>
                }>禁用指定项</Cell>

              <Cell
                description={
                  <Radio.Group
                    shape="radius"
                    value={this.state.radio}
                    onChange={value => console.log(`radio to ${value}`)}>
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2">选项三</Radio>
                  </Radio.Group>
                }>圆角</Cell>

              <Cell
                description={
                  <Radio.Group
                    shape="round"
                    value={this.state.radio}
                    onChange={value => console.log(`radio to ${value}`)}>
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2">选项三</Radio>
                  </Radio.Group>
                }>椭圆角</Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>块级样式</Panel.Title>
            </Panel.Header>
            <Panel.Body className="block-radio">
              <Radio.Group
                radius
                block
                value={this.state.radio}
                onChange={(value) => {
                  console.log(`radio to ${value}`);
                }}>
                <Radio value="0">选项一</Radio>
                <Radio value="1">选项二</Radio>
                <Radio value="2">选项三</Radio>
              </Radio.Group>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>列表样式</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Radio.Group
                type="cell"
                value={this.state.radio}
                onChange={(value) => {
                  console.log(`radio to ${value}`);
                }}>
                <Radio value={0}>选项一</Radio>
                <Radio value={1}>选项二</Radio>
                <Radio value={2}>选项三</Radio>
              </Radio.Group>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
