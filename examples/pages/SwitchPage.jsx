import React, { Component } from 'react';
import { Panel, Cell, Switch } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  toggle = (value) => {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <Container className="switch-page">
        <Header title="开关 Switch" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell
                description={
                  <Switch
                    checked={this.state.value}
                    onChange={(value) => {
                      this.setState({ value });
                    }}
                  />
                }
              >
                普通
              </Cell>
              <Cell description={<Switch defaultChecked />}>默认开</Cell>
              <Cell description={<Switch disabled />}>禁用的开关（默认关）</Cell>
              <Cell description={<Switch defaultChecked disabled />}>禁用的开关（默认开）</Cell>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
