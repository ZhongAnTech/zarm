import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Stepper } from '../../components';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  render() {
    return (
      <Container className="stepper-page">
        <Header title="步进器 Stepper" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell
                title="普通"
                description={
                  <Stepper
                    value={this.state.value}
                    onChange={(value) => {
                      console.log(value);
                    }}
                    />
                }
                />

              <Cell
                title="设置默认值"
                description={
                  <Stepper defaultValue={2} />
                }
                />

              <Cell
                title="设置上下限"
                description={
                  <Stepper min={-3} max={3} />
                }
                />

              <Cell
                title="设置步长"
                description={
                  <Stepper step={0.5} />
                }
                />

              <Cell
                title="禁用状态"
                description={
                  <Stepper disabled />
                }
                />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="多形状" />
            <Panel.Body>
              <Cell
                title="圆角"
                description={
                  <Stepper shape="radius" />
                }
                />

              <Cell
                title="圆形"
                description={
                  <Stepper shape="circle" />
                }
                />
            </Panel.Body>
          </Panel>

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
