import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Spinner } from '../../components';
import '../styles/pages/SpinnerPage';

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
      <div className="spinner-page">
        <Header title="指示器 Spinner" />
        <main>
          <Panel>
            <Panel.Body>
              <Cell description={
                <Spinner
                  className="rotate360"
                  percent={15}
                  theme={this.state.theme} />
              }>普通</Cell>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
