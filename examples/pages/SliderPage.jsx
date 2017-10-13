import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Slider } from '../../components';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <Container className="slider-page">
        <Header title="滑动输入条 Slider" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell title="普通">
                <Slider
                  value={this.state.value}
                  onChange={(value) => {
                    console.log(value);
                  }}
                  />
              </Cell>

              <Cell title="设置默认值">
                <Slider defaultValue={20} />
              </Cell>

              <Cell title="设置上下限">
                <Slider min={-100} max={100} defaultValue={0} />
              </Cell>

              <Cell title="设置步长">
                <Slider step={10} />
              </Cell>

              <Cell title="禁用状态">
                <Slider defaultValue={20} disabled />
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
