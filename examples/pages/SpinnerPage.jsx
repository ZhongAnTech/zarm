import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Spinner } from '../../components';

class Page extends Component {

  render() {
    return (
      <Container className="spinner-page">
        <Header title="指示器 Spinner" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell description={
                <Spinner />
              }>普通</Cell>

              <Cell description={
                <Spinner className="rotate360" />
              }>旋转动画</Cell>

              <Cell description={
                <Spinner size="lg" />
              }>大号</Cell>

            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
