import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Picker } from '../../components';
import District from './district';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      single: {},
      multiple: {},
      multiple2: {},
      disabled: {
        value: '1',
      },
      diy: {},
      city1: {},
      city2: {},
      yearPicker: {},
      datePicker: {},
      timePicker: {},
      datetimePicker: {},
      diyDatePicker: {},
      stactPicker: {
        value: [],
      },
    };
  }

  render() {
    const { single, multiple, multiple2, disabled, diy, city1, city2, yearPicker, datePicker, timePicker, datetimePicker, diyDatePicker, stactPicker } = this.state;

    return (
      <Container className="cell-page">
        <Header title="选择器 Picker" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>

              <Cell title="单列" type="select">
                <Picker
                  visible={single.visible}
                  dataSource={[
                    {
                      idCardType: 1,
                      idCardName: '身份证',
                    },
                    {
                      idCardType: 2,
                      idCardName: '护照',
                    },
                    {
                      idCardType: 3,
                      idCardName: '出生证',
                    },
                  ]}
                  value={single.value}
                  displayMember="idCardName"
                  valueMember="idCardType"
                  onOk={(value) => {
                    console.log('pickerPage onOk ->', value);
                    const _value = value.idCardType;
                    single.value = _value;
                    this.setState({
                      single,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="多列" type="select">
                <Picker
                  visible={multiple.visible}
                  dataSource={[
                    [
                      { value: '1', label: '选项一' },
                      { value: '2', label: '选项二' },
                    ],
                    [
                      { value: 'a', label: '选项A' },
                      { value: 'b', label: '选项B' },
                    ],
                  ]}
                  value={multiple.value}
                  onOk={(value) => {
                    console.log('multiple onOk ->', value);
                    const _value = value.map(item => item.value);
                    multiple.value = _value;
                    this.setState({
                      multiple,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="多列联动" type="select">
                <Picker
                  visible={multiple2.visible}
                  dataSource={[
                    {
                      value: '1',
                      label: '北京市',
                      children: [
                        { value: '11', label: '海淀区' },
                        { value: '12', label: '西城区' },
                      ],
                    },
                    {
                      value: '2',
                      label: '上海市',
                      children: [
                        { value: '21', label: '黄埔区' },
                        { value: '22', label: '虹口区' },
                      ],
                    },
                  ]}
                  // cols={2}
                  value={multiple2.value}
                  onOk={(value) => {
                    console.log('multiple2 onOk ->', value);
                    const _value = value.map(item => item.value);
                    multiple2.value = _value;
                    this.setState({
                      multiple2,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="禁止修改" type="select">
                <Picker
                  disabled
                  visible={disabled.visible}
                  dataSource={[
                    { value: '1', label: '选项一' },
                    { value: '2', label: '选项二' },
                  ]}
                  value={disabled.value}
                  onOk={(value) => {
                    console.log(value);
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="自定义格式" type="select">
                <Picker
                  visible={diy.visible}
                  title="自定义标题"
                  placeholder="自定义placeholder"
                  format="/"
                  dataSource={[
                    [
                      { value: '1', label: '选项一' },
                      { value: '2', label: '选项二' },
                    ],
                    [
                      { value: 'a', label: '选项A' },
                      { value: 'b', label: '选项B' },
                    ],
                  ]}
                  displayMember="label"
                  valueMember="value"
                  value={diy.value}
                  onOk={(value) => {
                    console.log('diy onOk ->', value);
                    const _value = value.map(item => item.value);
                    diy.value = _value;
                    this.setState({
                      diy,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>城市选择器</Panel.Title>
            </Panel.Header>
            <Panel.Body>

              <Cell title="省市选择" type="select">
                <Picker
                  visible={city1.visible}
                  dataSource={District}
                  cols={2}
                  displayMember="label"
                  valueMember="label"
                  value={city1.value}
                  onOk={(value) => {
                    console.log('city1 onOk->', value);
                    const _value = value.map(item => item.label);
                    city1.value = _value;
                    this.setState({
                      city1,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="省市区选择" type="select">
                <Picker
                  visible={city2.visible}
                  dataSource={District}
                  wheelDefaultValue={[]}
                  displayMember="label"
                  valueMember="label"
                  value={city2.value}
                  onOk={(value) => {
                    console.log('city2 onOk->', value);
                    const _value = value.map(item => item.label);
                    city2.value = _value;
                    this.setState({
                      city2,
                    });
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
                  wheelDefaultValue="2009"
                  value={yearPicker.value}
                  onOk={(value) => {
                    yearPicker.value = value;
                    this.setState({
                      yearPicker,
                    });
                    console.log(value);
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
                  wheelDefaultValue="2009"
                  value={datePicker.value}
                  onOk={(value) => {
                    datePicker.value = value;
                    this.setState({
                      datePicker,
                    });
                    console.log(value);
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
                  value={timePicker.value}
                  onOk={(value) => {
                    timePicker.value = value;
                    this.setState({
                      timePicker,
                    });
                    console.log(value);
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="日期&时间" type="select">
                <Picker.Date
                  placeholder="请选择"
                  mode="datetime"
                  value={datetimePicker.value}
                  onOk={(value) => {
                    datetimePicker.value = value;
                    this.setState({
                      datetimePicker,
                    });
                    console.log(value);
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
                  value={diyDatePicker.value}
                  onOk={(value) => {
                    diyDatePicker.value = value;
                    this.setState({
                      diyDatePicker,
                    });
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
              <Panel.Title>层叠式选择器</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell title="省市区选择">
                <Picker.Stack
                  title="请选择"
                  placeholder="请选择"
                  dataSource={District}
                  cols={3}
                  valueMember="value"
                  value={stactPicker.value}
                  labelAddon=" - "
                  itemCompile={data => `${data.label}(${data.value})`}
                  displayCompile={selected => selected.map(item => item.label).join('-')}
                  validate={selected => ((selected.length && selected[0].label === '北京') ? '选择了北京行政区域' : '')}
                  onOk={(selected) => {
                    console.log('选中项:', selected);
                    this.setState({
                      stactPicker: {
                        value: selected.map(item => item.value),
                      },
                    });
                  }}
                  onCancel={() => { console.log('===> cancel <==='); }}
                  />
              </Cell>

            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
