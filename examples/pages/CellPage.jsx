
import React, { Component } from 'react';
import { Button, Panel, Icon, Input, InputNumber, Cell, Select, Picker, Checkbox } from '../../components';
import District from './district'

class CellPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      picker: false,
      pickerValue: [undefined, undefined, undefined],
      sex: '',
      number: 0
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
            <Cell title="标题文字1" description="描述文字" icon={<Icon type="right" />}></Cell>
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
              <Input type="date" placeholder="请选择出生日期" />
            </Cell>

            <Cell title="份数" description={<InputNumber radius type="tel" theme="info" defaultValue={1} min={-3} max={3} step={1} value={this.state.number} 
              onChange={(value) => {
                console.log(value)
                if (isNaN(value)) {
                  return
                }

                this.setState({
                  number: value
                })
              }} />}>
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

            <Cell title="省份" type="select">
              <Picker
                placeholder="选择省份"
                dataSource={District}
                value={'520000'}
                onChange={(value) => {
                  console.log(value)
                }} />
            </Cell>

            <Cell title="所在城市" type="select">
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
                  console.log(values, selected)
                }}
                onOk={(value) => {
                  console.log('你选择了确定', value)
                  this.setState({
                    picker     : false,
                    pickerValue: value
                  })
                }}
                onCancel={() => {
                  this.setState({ picker: false })
                }}
                onMaskClick={() => {
                  this.setState({ picker: false })
                }} />
            </Cell>
            
            <Cell>
              <Checkbox defaultChecked={true} onChange={(value) => {
                console.log(value);
              }} />
            </Cell>

            <Cell>
              <Checkbox.Group onChange={(values) => {
                  console.log('Checkbox to ' + values);
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