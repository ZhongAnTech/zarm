import React, { PureComponent } from 'react';
import Header from '../components/Header';
import { Panel, Icon, Input, InputNumber, Cell, Select, Picker, Checkbox, Switch } from '../../components';
import District from './district';

class Page extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      picker: false,
      datePicker: false,
      sValue: [],
      dataSource: [],
      date: '',
      sex: 0,
      timer: 0,
      number: 2,
      disabled: false,
    };
  }

  toggle(key) {
    this.setState({
      [`${key}`]: !this.state[key],
    });
  }

  render() {
    return (
      <div className="cell-page">
        <Header title="列表项 Cell" />
        <main>
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
        </main>
      </div>
    );
  }
}

export default Page;
