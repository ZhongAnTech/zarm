import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Stepper } from '../../components';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stepper: 0,
    };
  }

  render() {
    return (
      <div className="stepper-page">
        <Header title="步进器 Stepper" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                title="普通"
                description={
                  <Stepper
                    value={this.state.stepper}
                    onChange={(value) => {
                      console.log(value);
                    }}
                    />}
                />

              <Cell
                title="设置上下限"
                description={
                  <Stepper
                    min={-3}
                    max={3}
                    step={1}
                    value={this.state.stepper}
                    onChange={(value) => {
                      console.log(value);
                    }}
                    />}
                />

              <Cell
                title="禁用状态"
                description={
                  <Stepper
                    disabled
                    onChange={(value) => {
                      console.log(value);
                    }}
                    />}
                />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>多形状</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                title="圆角"
                description={
                  <Stepper
                    shape="radius"
                    onChange={(value) => {
                      console.log(value);
                    }}
                    />}
                />

              <Cell
                title="圆型"
                description={
                  <Stepper
                    shape="circle"
                    onChange={(value) => {
                      console.log(value);
                    }}
                    />}
                />
            </Panel.Body>
          </Panel>

        </main>
      </div>
    );
  }
}

export default Page;
