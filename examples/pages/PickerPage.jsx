import React, { Component } from 'react';
import { Panel, Cell, Picker, DatePicker, Select, Button, PickerView } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import District from '../mock/district';
import '../styles/pages/PickerPage';

const multiData = [
  [
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
  ],
  [
    { value: '3', label: '选项三' },
    { value: '4', label: '选项四' },
  ],
];
class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      single: { value: '' },
      multi: { value: '' },
      multiCascadeData: [
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
      ],
      multiCascade: { value: ['1', '12'] },
      multiAssign: { value: ['1', '12'] },
      diy: {},
      address1: {},
      address2: {},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        multiCascadeData: [
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
              { value: '21', label: '杨浦区' },
              { value: '22', label: '静安区' },
            ],
          },
        ],
        multiCascade: {
          value: ['2', '21'],
        },
      });
    }, 1000);
  }

  open = (key) => {
    this.setState({
      [`${key}`]: true,
    });
  }

  close = (key) => {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    const { single, multi, multiCascade, multiAssign, diy, address1, address2 } = this.state;

    return (
      <Container className="picker-page">
        <Header title="选择器 Picker" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell title="单列">
                <Select
                  placeholder="请选择"
                  value={single.value}
                  dataSource={[{ value: '1', label: '选项一' }, { value: '2', label: '选项二' }]}
                  onChange={(selected) => {
                    single.value = selected.value;
                    this.setState({
                      single,
                    });
                  }}
                  />
              </Cell>

              <Cell title="多列">
                <Select
                  placeholder="请选择"
                  value={multi.value}
                  dataSource={multiData}
                  onChange={(selected) => {
                    const multiValue = selected.map(item => `${item.value}`);
                    multi.value = multiValue;
                    this.setState({
                      multi,
                    });
                  }}
                  displayRender={selected => selected.map(item => item.label).join('/')}
                  />
              </Cell>

              <Cell title="多列联动" description={<Button theme="primary" size="sm" onClick={() => { this.open('pickerVisible'); }}>请选择</Button>}>
                <div>{multiCascade.display}</div>
                <Picker
                  visible={this.state.pickerVisible}
                  dataSource={this.state.multiCascadeData}
                  value={this.state.multiCascade.value}
                  onOk={(selected) => {
                    multiCascade.value = selected.map(item => `${item.value}`);
                    multiCascade.display = selected.map(item => item.label).join('-');
                    this.setState({
                      multiCascade,
                    });
                    this.close('pickerVisible');
                  }}
                  displayRender={(selected) => {
                    return selected.map(item => item.label).join('/');
                  }}
                  />
              </Cell>

              <Cell title="指定默认值">
                <Select
                  placeholder="请选择"
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
                  value={multiAssign.value}
                  defaultValue={multiAssign.value}
                  onChange={(selected) => {
                    multiAssign.value = selected.map(item => `${item.value}`);
                    this.setState({
                      multiAssign,
                    });
                  }}
                  displayRender={(selected) => {
                    return selected.map(item => item.label).join('-');
                  }}
                  />
              </Cell>

              <Cell title="禁止修改">
                <Select
                  disabled
                  dataSource={[
                    { value: '1', label: '选项一' },
                    { value: '2', label: '选项二' },
                  ]}
                  defaultValue="2"
                  />
              </Cell>

              <Cell title="自定义格式">
                <Select
                  visible={diy.visible}
                  title="自定义标题"
                  placeholder="自定义placeholder"
                  dataSource={[
                    {
                      code: '1',
                      name: '北京市',
                      children: [
                        { code: '11', name: '海淀区' },
                        { code: '12', name: '西城区' },
                      ],
                    },
                    {
                      code: '2',
                      name: '上海市',
                      children: [
                        { code: '21', name: '黄埔区' },
                        { code: '22', name: '虹口区' },
                      ],
                    },
                  ]}
                  value={diy.value}
                  valueMember="code"
                  itemRender={data => data.name}
                  displayRender={selected => selected.map(item => item.name).join('/')}
                  onChange={(selected) => {
                    diy.value = selected.map(item => item.code);
                    this.setState({
                      diy,
                    });
                  }}
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="城市选择器" />
            <Panel.Body>

              <Cell title="省市选择">
                <Select
                  placeholder="选择省市"
                  dataSource={District}
                  cols={2}
                  value={address1.value}
                  onChange={(selected) => {
                    address1.value = selected.map(item => item.value);
                    this.setState({
                      address1,
                    });
                  }}
                  />
              </Cell>

              <Cell title="省市区选择">
                <Select
                  placeholder="选择省市区"
                  dataSource={District}
                  value={address2.value}
                  displayRender={selected => selected.map(item => item.label).join('-')}
                  onChange={(selected) => {
                    address2.value = selected.map(item => item.value);
                    this.setState({
                      address2,
                    });
                  }}
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="PickerView" />
            <Panel.Body>
              <PickerView
                dataSource={[
                  {
                    code: '1',
                    name: '北京市',
                    children: [
                      { code: '11', name: '海淀区' },
                      { code: '12', name: '西城区' },
                    ],
                  },
                  {
                    code: '2',
                    name: '上海市',
                    children: [
                      { code: '21', name: '黄埔区' },
                      { code: '22', name: '虹口区' },
                    ],
                  },
                ]}
                valueMember="code"
                itemRender={data => data.name}
                onChange={(value) => {
                  console.log(value);
                }}
                />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="日期选择器" />
            <Panel.Body>

              <Cell title="年份选择">
                <DatePicker
                  title="选择年份"
                  placeholder="请选择年份"
                  mode="year"
                  wheelDefaultValue="2009"
                  />
              </Cell>

              <Cell title="日期选择">
                <DatePicker
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  value="2009-03-04"
                  min="2007-01-03"
                  max="2017-11-23"
                  />
              </Cell>

              <Cell title="时间选择">
                <DatePicker
                  title="选择时间"
                  placeholder="请选择时间"
                  mode="time"
                  minuteStep={15}
                  />
              </Cell>

              <Cell title="日期&时间">
                <DatePicker mode="datetime" />
              </Cell>

              <Cell title="自定义格式">
                <DatePicker
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  format="yyyy年MM月dd日"
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="层叠式选择器" />
            <Panel.Body>
              <Cell title="级联选择">
                <Picker.Stack
                  dataSource={District}
                  displayRender={selected => selected.map(item => item.label).join('-')}
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
