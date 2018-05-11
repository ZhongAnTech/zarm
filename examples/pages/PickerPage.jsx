import React, { Component } from 'react';
import { Panel, Cell, Button, Toast, Picker, PickerView, Select } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import District from '../mock/district';
import '../styles/pages/PickerPage';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

// 普通多列数据
const MULTI_DATA = [
  [
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
  ],
  [
    { value: '3', label: '选项A' },
    { value: '4', label: '选项B' },
  ],
];

// 级联数据
const CASCADE_DATA = [
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
];

const DIY_DATA = [
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
];

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: {
        visible: false,
        value: [],
        dataSource: SINGLE_DATA,
      },
      multi: {
        visible: false,
        value: [],
        dataSource: MULTI_DATA,
      },
      cascade: {
        visible: false,
        value: [],
        dataSource: CASCADE_DATA,
      },
      diy: {
        visible: false,
        value: [],
        dataSource: DIY_DATA,
      },
      select: {
        visible: false,
        value: [],
        dataSource: CASCADE_DATA,
      },
      view: {
        value: ['1', '12'],
        dataSource: CASCADE_DATA,
      },
    };
  }

  componentDidMount() {
    // 异步加载数据源测试
    setTimeout(() => {
      const { cascade, select } = this.state;

      cascade.dataSource = District;
      cascade.value = ['310000', '310100', '310101'];
      this.setState({ cascade });

      select.dataSource = District;
      select.value = ['310000', '310100', '310101'];
      this.setState({ select });
    }, 0);
  }

  toggle = (key) => {
    const state = this.state[key];
    state.visible = !state.visible;
    this.setState({ [`${key}`]: state });
  }

  render() {
    const {
      single,
      multi,
      cascade,
      diy,
      select,
      view,
    } = this.state;

    return (
      <Container className="picker-page">
        <Header title="选择器 Picker & Select" />
        <main>
          <Panel>
            <Panel.Header title="选择器 Picker" />
            <Panel.Body>
              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('single')}>打开</Button>
                }
              >
                单列
              </Cell>

              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('multi')}>打开</Button>
                }
              >
                多列
              </Cell>

              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('cascade')}>打开</Button>
                }
              >
                级联
              </Cell>

              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('diy')}>打开</Button>
                }
              >
                自定义
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="选择器表单控件 Select" />
            <Panel.Body>
              <Cell title="城市">
                <Select
                  visible={select.visible}
                  placeholder="请选择省市区"
                  value={select.value}
                  dataSource={select.dataSource}
                  onOk={(selected) => {
                    console.log('Select onOk: ', selected);
                    select.value = selected.map(item => item.value);
                    this.setState({ select });
                  }}
                />
              </Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="平铺选择器 PickerView" />
            <Panel.Body>
              <PickerView
                value={view.value}
                dataSource={view.dataSource}
                onChange={selected => console.log('PickerView onChange: ', selected)}
              />
            </Panel.Body>
          </Panel>

          <Picker
            visible={single.visible}
            value={single.value}
            dataSource={single.dataSource}
            onOk={(selected) => {
              console.log('Picker onOk: ', selected);
              single.value = selected.map(item => item.value);
              this.setState({ single });
              Toast.show(JSON.stringify(selected));
              this.toggle('single');
            }}
            onCancel={() => this.toggle('single')}
          />

          <Picker
            visible={multi.visible}
            value={multi.value}
            dataSource={multi.dataSource}
            onOk={(selected) => {
              console.log('Picker onOk: ', selected);
              multi.value = selected.map(item => item.value);
              this.setState({ multi });
              Toast.show(JSON.stringify(selected));
              this.toggle('multi');
            }}
            onCancel={() => this.toggle('multi')}
          />

          <Picker
            visible={cascade.visible}
            value={cascade.value}
            dataSource={cascade.dataSource}
            onOk={(selected) => {
              console.log('Picker onOk: ', selected);
              cascade.value = selected.map(item => item.value);
              this.setState({ cascade });
              Toast.show(JSON.stringify(selected));
              this.toggle('cascade');
            }}
            onCancel={() => this.toggle('cascade')}
          />

          <Picker
            visible={diy.visible}
            title="custom title"
            cancelText="Cancel"
            okText="Ok"
            dataSource={diy.dataSource}
            value={diy.value}
            valueMember="code"
            itemRender={data => data.name}
            onOk={(selected) => {
              console.log('Picker onOk: ', selected);
              diy.value = selected.map(item => item.code);
              this.setState({
                diy,
              });
              Toast.show(JSON.stringify(selected));
              this.toggle('diy');
            }}
            onCancel={() => this.toggle('diy')}
          />
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
