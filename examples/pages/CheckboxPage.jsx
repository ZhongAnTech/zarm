import React, { PureComponent } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Checkbox } from '../../components';
// import '../styles/pages/CheckboxPage';

class Page extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      checkbox: '0',
    };
  }

  render() {
    return (
      <div className="checkbox-page">
        <Header title="复选框 Checkbox" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                description={
                  <Checkbox.Group
                    value={this.state.Checkbox}
                    onChange={value => console.log(`checkbox to ${value}`)}>
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>普通</Cell>

            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
