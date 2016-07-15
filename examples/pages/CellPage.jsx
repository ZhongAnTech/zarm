
import React, { Component } from 'react';
import { Panel, Icon, Cell } from '../../components';

class CellPage extends Component {

  render() {
    return (
      <div className="cell-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>普通列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="标题文字">11</Cell>
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

      </div>
    );
  }
}

export default CellPage;