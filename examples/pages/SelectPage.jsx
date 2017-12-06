import React, { Component } from 'react';
import { Panel, Cell, Select } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import District from '../mock/district';

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
      multiAssign: { value: ['1', '12'] },
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
    const { single, multi, multiAssign, multiCascade, diy, address1, address2 } = this.state;

    return (
      <Container className="select-page">
        <Header title="选择器 Select" />
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

              <Cell title="多列联动">
                <Select
                  placeholder="请选择"
                  dataSource={this.state.multiCascadeData}
                  value={this.state.multiCascade.value}
                  onChange={(selected) => {
                    multiCascade.value = selected.map(item => `${item.value}`);
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
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
