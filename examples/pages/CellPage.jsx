
import React, { Component } from 'react';
import { Button, Panel, Icon, Input, Cell, Select } from '../../components';

class CellPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      select: false
    }
  }

  toggle(key) {
    this.setState({
      [`${ key }`]: !this.state[key]
    });
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
            <Cell title="标题文字" description={<Icon type="check" />}></Cell>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带图标、描述的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="标题文字" description="描述文字" icon={<Icon type="check" />}></Cell>
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
            <Cell type="link" title="标题文字" description="描述文字" icon={<Icon type="check" />}></Cell>
            <Cell type="link" title="标题文字" description="描述文字" icon={<img src="https://weui.io/images/icon_nav_toast.png" />}></Cell>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带图标、描述、跳转的列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="姓名">
              <Input type="text" placeholder="请输入姓名" />
            </Cell>
            <Cell title="出生日期">
              <Input type="date" placeholder="请选择出生日期" />
            </Cell>
            <Cell title="选择">
              <Input type="text" placeholder="请选择日期" readOnly onClick={() => this.toggle('select')} />
              <Select
                visible={this.state.select}
                title="选择日期"
                onMaskClick={() => this.toggle('select')}
                onCancel={() => this.toggle('select')}
                onOk={(data) => {
                  alert('你选择了确定')
                  this.toggle('select')
                }}>
              </Select>
            </Cell>
          </Panel.Body>
        </Panel>

      </div>
    );
  }
}

export default CellPage;