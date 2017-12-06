import React, { Component } from 'react';
import { Panel, Cell, Picker, Select, Button, PickerView } from 'zarm';
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
      multi: { value: ['1', '4'], display: '选项一&选项四' },
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
    const { single, multi, multiVisible, multiCascade,
      address1, addr1Visible, address2, addr2Visible } = this.state;

    return (
      <Container className="picker-page">
        <Header title="选择器 Picker" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell title="单列" hasArrow>
                <Select
                  placeholder="请选择"
                  className="show-right"
                  value={single.value}
                  dataSource={[{ value: '1', label: '选项一' }, { value: '2', label: '选项二' }]}
                  onChange={(selected) => {
                    console.log('pickerPage onChange=> ', selected);
                    single.value = selected.value;
                    single.display = selected.label;
                    this.setState({
                      single,
                    });
                  }}
                  />
              </Cell>

              <Cell title="多列" hasArrow onClick={() => { this.open('multiVisible'); }}>
                {multi.value ? <div className="show-right">{multi.display}</div> : <div className="za-picker-placeholder show-right">请选择</div>}
                <Picker
                  visible={multiVisible}
                  value={multi.value}
                  dataSource={multiData}
                  onOk={(selected) => {
                    multi.value = selected.map(item => `${item.value}`);
                    multi.display = selected.map(item => `${item.label}`).join('&');
                    this.setState({
                      multi,
                    });
                    this.close('multiVisible');
                  }}
                  onCancel={() => this.close('multiVisible')}
                  />
              </Cell>

              <Cell title="多列联动" description={<Button theme="primary" size="sm" onClick={() => { this.open('pickerVisible'); }}>请选择</Button>}>
                <div>{multiCascade.display}</div>
                <Picker
                  visible={this.state.pickerVisible}
                  dataSource={this.state.multiCascadeData}
                  value={this.state.multiCascade.value}
                  onChange={(selected) => {
                    console.log(selected);
                  }}
                  onOk={(selected) => {
                    multiCascade.value = selected.map(item => `${item.value}`);
                    multiCascade.display = selected.map(item => item.label).join('-');
                    this.setState({
                      multiCascade,
                    });
                    this.close('pickerVisible');
                  }}
                  onCancel={() => this.close('pickerVisible')}
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="城市选择器" />
            <Panel.Body>
              <Cell title="省市选择" description={<Button theme="primary" size="sm" onClick={() => { this.open('addr1Visible'); }}>请选择省市</Button>}>
                <div>{this.state.address1.display}</div>
                <Picker
                  visible={addr1Visible}
                  dataSource={District}
                  cols={2}
                  value={address1.value}
                  onOk={(selected) => {
                    address1.value = selected.map(item => item.value);
                    address1.display = selected.map(item => item.label).join('-');
                    this.setState({
                      address1,
                    });
                    this.close('addr1Visible');
                  }}
                  onCancel={() => this.close('addr1Visible')}
                  />
              </Cell>

              <Cell description={<Button theme="primary" size="sm" onClick={() => { this.open('addr2Visible'); }}>选择省市区</Button>}>
                <div>{this.state.address2.display}</div>
                <Picker
                  visible={addr2Visible}
                  dataSource={District}
                  value={address2.value}
                  onOk={(selected) => {
                    address2.value = selected.map(item => item.value);
                    address2.display = selected.map(item => item.label).join('-');
                    this.setState({
                      address2,
                    });
                    this.close('addr2Visible');
                  }}
                  onCancel={() => this.close('addr2Visible')}
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="平铺选择器" />
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
