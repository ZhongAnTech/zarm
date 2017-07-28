import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Spinner } from '../../components';
import '../styles/pages/SpinnerPage';

class Page extends Component {
  render() {
    return (
      <div className="spinner-page">
        <Header title="指示器 Spinner" />
        <main>
          <Panel>
            <Panel.Body>
              <Cell description={
                <Spinner className="rotate360" />
              }>普通</Cell>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
