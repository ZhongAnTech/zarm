import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell } from '../../components';

class Page extends Component {

  render() {
    return (
      <Container className="panel-page">
        <Header title="面板 Panel" />
        <main>
          <Panel>
            <Panel.Header title="普通" />
            <Panel.Body>
              <Cell>body</Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="带更多按钮" more={<a onClick={() => alert('click more')}>更多</a>} />
            <Panel.Body>
              <Cell>body</Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="带底部" />
            <Panel.Body>
              <Cell>body</Cell>
            </Panel.Body>
            <Panel.Footer title="左侧文案" more="右侧文案" />
          </Panel>

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
