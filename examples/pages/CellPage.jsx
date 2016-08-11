
import React, { Component } from 'react';
import { Button, Panel, Icon, Input, Cell, Select, Selector, Checkbox } from '../../components';

const addressData = [
  { 
    value: 'bj',
    name : '北京',
    children: [
      {
        value: 'bjs',
        name: '北京市',
        children: [
          {
            value: 'hdq',
            name: '海淀区',
          },
          {
            value: 'xcq',
            name: '西城区',
          },
          {
            value: 'cwq',
            name: '崇文区',
          },
          {
            value: 'dcq',
            name: '东城区',
          },
          {
            value: 'cyq',
            name: '朝阳区',
          }
        ]
      }
    ]
  },
  { 
    value: 'fj',
    name : '福建省',
    children: [
      {
        value: 'sms',
        name: '三明市',
        children: [
          {
            value: 'sx',
            name: '沙县',
          },
          {
            value: 'nh',
            name: '宁化县',
          },
          {
            value: 'tn',
            name: '泰宁县',
          }
        ]
      },
      {
        value: 'fzs',
        name: '福州市',
        children: [
          {
            value: 'fdx',
            name: '福鼎县',
          },
          {
            value: 'clx',
            name: '长乐县',
          }
        ]
      }
    ]
  }
];

class CellPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      select       : false,
      province     : '',
      city         : '',
      country      : '',
      provinceData : addressData,
      cityData     : addressData[0].children,
      countryData  : addressData[0].children[0].children,
      sex: ''
    }
  }

  toggle(key) {
    this.setState({
      [`${ key }`]: !this.state[key]
    });
  }

  componentDidMount() {
    this.setState({
      sex: 'F'
    })
  }

  render() {
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
            <Cell title="标题文字" description={<Icon type="right" />}></Cell>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带图标、描述的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="标题文字" description="描述文字" icon={<Icon type="right" />}></Cell>
            <Cell title="标题文字" description="描述文字" icon={<img src="https://weui.io/images/icon_nav_toast.png" />}></Cell>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带跳转的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell type="link" title="标题文字"></Cell>
            <Cell type="link" title="标题文字"></Cell>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带描述、跳转的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell type="link" title="标题文字" description="描述文字"></Cell>
            <Cell type="link" title="标题文字" description="描述文字"></Cell>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带图标、描述、跳转的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell type="link" title="标题文字" description="描述文字" icon={<Icon type="right" />}></Cell>
            <Cell type="link" title="标题文字" description="描述文字" icon={<img src="https://weui.io/images/icon_nav_toast.png" />}></Cell>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带图标、描述、跳转的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>  
            <Cell title="姓名" help={<span><Icon type="info-round" /> 姓名不能为空</span>}>
              <Input type="text" placeholder="请输入姓名" />
            </Cell>
            <Cell title="出生日期" type="select">
              <Input type="date" placeholder="请选择出生日期" defaultValue="2016-01-11" />
            </Cell>
            <Cell title="性别" type="select">
              <Select
                placeholder="请选择性别" 
                value={this.state.sex}
                onChange={(e) => {
                  console.log(e.target.value)
                }}>
                <Select.Option value="M">男</Select.Option>
                <Select.Option value="F">女</Select.Option>
              </Select>
            </Cell>
            <Cell title="所在城市" type="select">
              <Selector
                title="选择城市"
                placeholder="请选择城市"
                onOk={(data) => {
                  alert('你选择了确定')
                }}>
                <Selector.Option dataSource={this.state.provinceData} defaultValue={this.state.province} onChange={(data) => {
                  this.setState({
                    province   : data.value,
                    cityData   : this.state.provinceData[data.index].children,
                    countryData: this.state.provinceData[data.index].children[0].children
                  });
                }} />
                <Selector.Option dataSource={this.state.cityData} defaultValue={this.state.city} onChange={(data) => {
                  this.setState({
                    city       : data.value,
                    countryData: this.state.cityData[data.index].children
                  });
                }} />
                <Selector.Option dataSource={this.state.countryData} defaultValue={this.state.country} onChange={(data) => {
                  this.setState({
                    country    : data.value,
                  });
                }} />
              </Selector>
            </Cell>
            <Cell>
              <Checkbox onChange={(e) => {
                console.log(e.target.checked);
              }}>Checkbox</Checkbox>
            </Cell>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default CellPage;