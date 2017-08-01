
import React, { Component } from 'react';
import { Panel, Icon, Input, InputNumber, Cell, Select, Picker, Checkbox, Switch, SwipeAction } from '../../components';
import District from './district';
import testData from './testData';

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

const col1Data = [{
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
}];


class CellPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      picker: false,
      datePicker: false,
      CascaderPicker: false,
      sValue: [],
      dataSource: [],
      date: '',
      sex: '',
      timer: 0,
      number: 0,
      disabled: false,
      testPicker1: false,
      testPicker2: false,
      single: {},
      single2: {},
      col1: {
        // value: 1,
      },
      single1Data: testData.result.bookingDate[0],
      single2Data: testData.result.bookingTime[0],
    };
  }

  componentDidMount() {
    // setInterval(() => {
    //   let timer = this.state.timer ;
    //   this.setState({
    //     timer: ++timer
    //   })
    // }, 1000)
    // setTimeout(() => {
    //   this.setState({
    //     dataSource: District,
    //     disabled: false,
    //   });
    // }, 3000);
  }

  toggle(key) {
    this.setState({
      [`${key}`]: !this.state[key],
    });
  }

  matchDate(value) {

    return testData.result.bookingDate[0].forEach((item, index) => {
      if(item.value === value) {
        return index;
      }
    })
  }

  render() {
    const { single, single2, col1 } = this.state;
    return (
      <div className="cell-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>普通列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="标题文字" />
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带描述的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="标题文字" description="描述文字" />
            <Cell title="标题文字" description={<Icon type="right" />} />
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带图标、描述的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="标题文字1" description="描述文字" icon={<Icon type="right" />} />
            <Cell title="标题文字" description="描述文字" icon={<img alt="" src="https://weui.io/images/icon_nav_toast.png" />} />
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带跳转的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell type="link" title="标题文字" />
            <Cell type="link" title="标题文字" />
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带描述、跳转的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell type="link" title="标题文字" description="描述文字" />
            <Cell type="link" title="标题文字" description="描述文字" />
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带图标、描述、跳转的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell type="link" title="标题文字" description="描述文字" icon={<Icon type="right" />} />
            <Cell type="link" title="标题文字" description="描述文字" icon={<img alt="" src="https://weui.io/images/icon_nav_toast.png" />} />
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>表单组件</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="姓名" help={<span><Icon type="info-round" /> 姓名不能为空</span>}>
              <Input type="text" placeholder="请输入姓名" />
            </Cell>

            <Cell title="出生日期" type="select">
              <Input type="date" placeholder="请选择出生日期" />
            </Cell>

            <Cell
              title="份数"
              description={
                <InputNumber
                  radius
                  type="tel"
                  theme="info"
                  defaultValue={-1}
                  min={-3}
                  max={3}
                  step={1}
                  value={this.state.number}
                  onChange={(value) => {
                    if (value === '' || isNaN(value)) {
                      return;
                    }
                    this.setState({
                      number: value,
                    });
                  }}
                  />}
              />

            <Cell title="开关" description={<Switch theme="success" />} />

            <Cell title="性别" type="select">
              <Select
                placeholder="请选择性别"
                value={this.state.sex}
                onChange={(e) => {
                  console.log(e.target.value);
                }}>
                <Select.Option value="M">男</Select.Option>
                <Select.Option value="F">女</Select.Option>
              </Select>
            </Cell>

           <Cell title="单列" type="select">
              <Picker
                placeholder="单列选择"
                visible={col1.visible}
                dataSource={col1Data}
                valueMember="idCardType"
                displayMember="idCardName"
                value={col1.value}
                onChange={(value) => {
                  console.log('onChange ', value);
                }}
                onOk={(value) => {
                  console.log('外部ok value ->', value);
                  col1.value = value;
                  this.setState({
                    col1,
                  });
                }}
                />
            </Cell>

            {/* <Cell title="所在城市" type="select">
              <Picker.Group
                visible={this.state.picker}
                title="选择城市"
                placeholder="请选择城市"
                dataSource={District}
                value={this.state.pickerValue}
                valueMember="label"
                displayMember="label"
                format=""
                onChange={(values, selected) => {
                  console.log(values, selected);
                }}
                onOk={(value) => {
                  console.log('你选择了确定', value);
                  this.setState({
                    picker: false,
                    pickerValue: value,
                  });
                }}
                onCancel={() => {
                  this.setState({ picker: false });
                }}
                onMaskClick={() => {
                  this.setState({ picker: false });
                }}
                />
            </Cell>*/}

            <Cell title="日期选择器" type="select">
              <Picker.Date
                visible={this.state.datePicker}
                title="选择日期"
                placeholder="请选择日期"
                mode="date"
                wheelDefaultValue="2009-02-13"
                disabled={this.state.disabled}
                value={this.state.date}
                defaultValue={this.state.date}
                onChange={(value) => {
                  console.log('外部change value ->', value);
                  // this.setState({
                  //   date: value,
                  // });
                }}
                onOk={(value) => {
                  console.log('外部ok value ->', value);
                  this.setState({
                    date: value,
                  });
                }}
                onCancel={() => {
                }}
              />
            </Cell>

            <Cell title="多级选择器" type="select">
              <Picker
                visible={this.state.CascaderPicker}
                title="请选择"
                placeholder="请选择"
                format="-"
                disabled={this.state.disabled}
                dataSource={District}
                cols={3}
                displayMember="label"
                valueMember="label"
                value={this.state.sValue}
                onChange={(value) => {
                  console.log('外部change value ->', value);
                }}
                onOk={(value) => {
                  console.log(value);
                  this.setState({ sValue: value });
                }}
                onCancel={() => {
                }}
                />
            </Cell>

            <Cell title="单列日期" type="select">
              <Picker
                visible={single.visible}
                dataSource={this.state.single1Data}
                value={single.value}
                onOk={(value) => {
                  single.value = value;

                  const _index = testData.result.bookingDate[0].findIndex((item) => (
                    item.value === value
                  ));
                  this.setState({
                    single,
                    single2Data: testData.result.bookingTime[_index],
                  });
                  console.log("pickerPage onOk ->", value);
                }}
                onCancel={() => {
                }}
                />
            </Cell>

            <Cell title="单列时间" type="select">
              <Picker
                visible={single2.visible}
                dataSource={this.state.single2Data}
                value={single2.value}
                onOk={(value) => {
                  single2.value = value;

                  this.setState({
                    single2,
                  });
                  console.log("pickerPage onOk ->", value);
                }}
                onCancel={() => {
                }}
                />
            </Cell>

            <SwipeAction
              prefixCls="ui-swipeAction"
              right={
                <div className="demo-btn-wrap">
                  <div className="demo-del del1">删除1</div>
                  <div className="demo-del del2">删除2</div>
                </div>
              }>
              <Panel>
                <Panel.Body>
                  <Cell title="标题文字" />
                </Panel.Body>
              </Panel>
            </SwipeAction>

            <Cell>
              <Checkbox
                defaultChecked
                onChange={(value) => {
                  console.log(value);
                }}
                />
            </Cell>

            <Cell>
              <Checkbox.Group
                onChange={(values) => {
                  console.log(`Checkbox to ${values}`);
                }}>
                <Checkbox value="a">A</Checkbox>
                <Checkbox value="b" disabled>B</Checkbox>
                <Checkbox value="c">C</Checkbox>
                <Checkbox value="d">D</Checkbox>
              </Checkbox.Group>
            </Cell>

          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default CellPage;
