import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Spinner, Cell } from '../../components';

class Page extends Component {

  render() {
    return (
      <div className="spinner-page">
        <Header title="指示器 Spinner" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                description={
                  <Spinner percent={50} />
                }>loading</Cell>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
