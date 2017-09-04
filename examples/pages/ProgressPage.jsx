import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Stepper, Progress, Picker } from '../../components';
import '../styles/pages/ProgressPage';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 10,
      theme: 'primary',
    };
  }

  render() {
    return (
      <Container className="progress-page">
        <Header title="进度条 Progress" />
        <main>
          <div className="progress">
            <Progress
              percent={this.state.percent}
              theme={this.state.theme}>
              {this.state.percent}%
            </Progress>
          </div>
          <div className="progress">
            <Progress
              shape="circle"
              percent={this.state.percent}
              theme={this.state.theme}>
              <div className="progress-content">
                <span className="progress-text">{this.state.percent}</span>
                <span className="progress-percent">%</span>
              </div>
            </Progress>
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
                    if (isNaN(value)) return;
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
                    { value: 'primary', label: 'primary' },
                    { value: 'info', label: 'info' },
                    { value: 'warning', label: 'warning' },
                    { value: 'error', label: 'error' },
                  ]}
                  onOk={(selected) => {
                    this.setState({
                      theme: selected.value,
                    });
                  }}
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
