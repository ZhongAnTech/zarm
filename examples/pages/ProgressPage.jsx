import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Stepper, Progress, Picker } from '../../components';
import '../styles/pages/ProgressPage';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      theme: 'info',
    };
  }

  render() {
    return (
      <div className="progress-page">
        <Header title="进度条 Progress" />
        <main>
          <div className="show">
            <Progress
              percent={this.state.percent}
              theme={this.state.theme} />
          </div>
          <Panel>
            <Panel.Body>
              <Cell title="进度">
                <Stepper
                  shape="radius"
                  step={10}
                  min={0}
                  max={100}
                  value={this.state.percent}
                  onChange={(value) => {
                    this.setState({
                      percent: value,
                    });
                  }}
                  />
              </Cell>

              <Cell title="主题">
                <Picker
                  value={this.state.theme}
                  dataSource={[
                    { value: 'default', label: 'default' },
                    { value: 'info', label: 'info' },
                    { value: 'warning', label: 'warning' },
                    { value: 'error', label: 'error' },
                  ]}
                  onOk={(value) => {
                    this.setState({
                      theme: value,
                    });
                  }}
                  />
                </Cell>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
