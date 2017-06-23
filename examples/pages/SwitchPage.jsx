import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Switch } from '../../components';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switch: false,
    };
  }

  toggle(value) {
    this.setState({
      switch: value,
    });
  }

  render() {
    return (
      <div className="switch-page">
        <Header title="开关 Switch" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell description={<Switch />}>默认关</Cell>
              <Cell description={<Switch defaultChecked />}>默认开</Cell>
              <Cell description={<Switch disabled />}>禁用的开关（默认关）</Cell>
              <Cell description={<Switch defaultChecked disabled />}>禁用的开关（默认开）</Cell>
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header>
              <Panel.Title>受控开关</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell description={<Switch onChange={value => this.toggle(value)} />}>主开关</Cell>
              <Cell description={<Switch checked={this.state.switch} onChange={value => console.log(value)} />}>受控开关</Cell>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
