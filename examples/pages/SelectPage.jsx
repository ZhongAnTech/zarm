import React, { Component } from 'react';
import { Panel, Cell, Select } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import District from '../mock/district';

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
      address1: {
        visible: false,
        value: [],
        dataSource: District,
      },
      address2: {
        visible: false,
        value: [],
        dataSource: District,
      },
    };
  }

  componentDidMount() {
    // 异步加载数据源测试
    setTimeout(() => {
      const cascade = this.state.cascade;
      cascade.dataSource = District;
      this.setState({ cascade });
    }, 1000);
  }

  render() {
    const { single, multi, cascade, diy, address1, address2 } = this.state;

    return (
      <Container className="select-page">
        <Header title="选择器 Select" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell title="单列">
                <Select
                  value={single.value}
                  dataSource={single.dataSource}
                  onChange={(selected) => {
                    console.log('Select onChange: ', selected);
                    single.value = selected.map(item => item.value);
                    this.setState({ single });
                  }}
                  />
              </Cell>

              <Cell title="多列">
                <Select
                  value={multi.value}
                  dataSource={multi.dataSource}
                  onChange={(selected) => {
                    console.log('Select onChange: ', selected);
                    multi.value = selected.map(item => item.value);
                    this.setState({ multi });
                  }}
                  />
              </Cell>

              <Cell title="多列联动">
                <Select
                  dataSource={cascade.dataSource}
                  value={cascade.value}
                  onChange={(selected) => {
                    console.log('Select onChange: ', selected);
                    cascade.value = selected.map(item => item.value);
                    this.setState({ cascade });
                  }}
                  />
              </Cell>

              <Cell title="指定默认值">
                <Select
                  defaultValue={['1', '4']}
                  dataSource={multi.dataSource}
                  onChange={(selected) => {
                    console.log('Select onChange: ', selected);
                    multi.value = selected.map(item => item.value);
                    this.setState({ multi });
                  }}
                  />
              </Cell>

              <Cell title="禁止修改">
                <Select
                  disabled
                  dataSource={single.dataSource}
                  defaultValue={'2'}
                  />
              </Cell>

              <Cell title="自定义格式">
                <Select
                  dataSource={diy.dataSource}
                  value={diy.value}
                  valueMember="code"
                  itemRender={data => data.name}
                  displayRender={selected => selected.map(item => item.name).join('/')}
                  title="custom title"
                  placeholder="custom placeholder"
                  cancelText="Cancel"
                  okText="Ok"
                  onChange={(selected) => {
                    console.log('Select onChange: ', selected);
                    diy.value = selected.map(item => item.value);
                    this.setState({ diy });
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
                  dataSource={address1.dataSource}
                  value={address1.value}
                  cols={2}
                  onChange={(selected) => {
                    console.log('Select onChange: ', selected);
                    address1.value = selected.map(item => item.value);
                    this.setState({ address1 });
                  }}
                  />
              </Cell>

              <Cell title="省市区选择">
                <Select
                  placeholder="选择省市区"
                  dataSource={address2.dataSource}
                  value={address2.value}
                  onChange={(selected) => {
                    console.log('Select onChange: ', selected);
                    address2.value = selected.map(item => item.value);
                    this.setState({ address2 });
                  }}
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
