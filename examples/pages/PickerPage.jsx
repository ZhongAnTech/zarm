import React, { PureComponent } from 'react';
import Header from '../components/Header';
import { Panel, Icon, Input, InputNumber, Cell, Select, Picker, Checkbox, Switch } from '../../components';
import District from './district';

class Page extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      picker: false,
      datePicker: false,
      sValue: [],
      date: '',
    };
  }

  toggle(key) {
    this.setState({
      [`${key}`]: !this.state[key],
    });
  }

  render() {
    return (
      <div className="cell-page">
        <Header title="选择器 Picker" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
            
              <Cell title="单列选择器" type="select">
                <Picker
                  visible={this.state.picker}
                  title="请选择"
                  placeholder="请选择"
                  disabled={this.state.disabled}
                  dataSource={[
                    { value: '1', label: '选项一' },
                    { value: '2', label: '选项二' },
                  ]}
                  cols={1}
                  value={this.state.sValue}
                  onOk={(value) => {
                    console.log(value);
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>
            
              <Cell title="城市选择器" type="select">
                <Picker
                  visible={this.state.picker}
                  title="请选择"
                  placeholder="请选择"
                  disabled={this.state.disabled}
                  dataSource={District}
                  cols={3}
                  displayMember="label"
                  valueMember="label"
                  value={this.state.sValue}
                  onOk={(value) => {
                    console.log(value);
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="自定义格式" type="select">
                <Picker
                  visible={this.state.picker}
                  title="请选择"
                  placeholder="请选择"
                  format="/"
                  disabled={this.state.disabled}
                  dataSource={District}
                  cols={3}
                  displayMember="label"
                  valueMember="label"
                  value={this.state.sValue}
                  onOk={(value) => {
                    console.log(value);
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>日期选择器</Panel.Title>
            </Panel.Header>
            <Panel.Body>

              <Cell title="年份选择" type="select">
                <Picker.Date
                  title="选择年份"
                  placeholder="请选择年份"
                  mode="year"
                  disabled={this.state.disabled}
                  value={this.state.date}
                  defaultValue={this.state.date}
                  onOk={(value) => {
                    this.setState({
                      date: value,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="日期选择" type="select">
                <Picker.Date
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  disabled={this.state.disabled}
                  value={this.state.date}
                  defaultValue={this.state.date}
                  onOk={(value) => {
                    this.setState({
                      date: value,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="时间选择" type="select">
                <Picker.Date
                  title="选择时间"
                  placeholder="请选择时间"
                  mode="time"
                  disabled={this.state.disabled}
                  value={this.state.date}
                  defaultValue={this.state.date}
                  onOk={(value) => {
                    this.setState({
                      date: value,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="日期&时间" type="select">
                <Picker.Date
                  placeholder="请选择"
                  mode="datetime"
                  disabled={this.state.disabled}
                  value={this.state.date}
                  defaultValue={this.state.date}
                  onOk={(value) => {
                    this.setState({
                      date: value,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="自定义格式" type="select">
                <Picker.Date
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  format="YYYY年MM月DD日"
                  disabled={this.state.disabled}
                  value={this.state.date}
                  defaultValue={this.state.date}
                  onOk={(value) => {
                    this.setState({
                      date: value,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
