import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Spinner } from '../../components';
import '../styles/pages/SpinnerPage';

class Page extends Component {
  render() {
    return (
      <Container className="spinner-page">
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
        <Footer />
      </Container>
    );
  }
}

export default Page;
