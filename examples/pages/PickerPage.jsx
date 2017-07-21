import React, { Component } from 'react';
import Header from '../components/Header';
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
        value: [{"label":"湖北省","value":"420000"},{"label":"十堰市","value":"420300"},{"label":"丹江口市","value":"420381"}]
      }
    };
  }

  render() {
    const { single, multiple, multiple2, disabled, diy, city1, city2, yearPicker, datePicker, timePicker, datetimePicker, diyDatePicker, stactPicker } = this.state;

    return (
      <div className="cell-page">
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
                    { value: '1', label: '选项一' },
                    { value: '2', label: '选项二' },
                  ]}
                  value={single.value}
                  onOk={(value) => {
                    single.value = value;
                    this.setState({
                      single,
                    });
                    console.log("pickerPage onOk ->", value);
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
                    multiple.value = value;
                    this.setState({
                      multiple,
                    });
                    console.log("multiple onOk ->", value);
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
                    multiple2.value = value;
                    this.setState({
                      multiple2,
                    });
                    console.log(value);
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
                    diy.value = value;
                    this.setState({
                      diy,
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
                    city1.value = value;
                    this.setState({
                      city1,
                    });
                    console.log('onOk->', value);
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
                    city2.value = value;
                    this.setState({
                      city2,
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

            <Cell title="层叠式选择器" type="select">
              <Picker.Stack
                title="请选择"
                placeholder="请选择"
                disabled={ false }
                dataSource={ District }
                cols={ 3 }
                valueMember="value"
                value={ stactPicker.value }
                crumbAddon=" - "
                labelCompile={ ({ value, label }, index, arr) => (index === undefined || index === arr.length - 1) ? `${ label }(${ value })` : '' }
                validate={ data => (data.length === 3 && data[0].label === '北京') ? '选择了北京行政区域' : '' }
                onOk={ value => {
                  console.log('外部change value ->', value);
                  this.setState({
                    stactPicker: {
                      value
                    }
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
