import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Pull } from '../../components';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {

    const itemsRender = [];
    for (var i = 0; i < 20; i++) {
      itemsRender.push(<Cell key={+i}>第 {i+1} 行</Cell>);
    }

    return (
      <Container className="pull-page">
        <Header title="下拉刷新 Pull" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Pull
                loading={this.state.loading}
                onRefresh={() => {
                  console.log('onRefresh');
                  this.setState({ loading: true });
                  setTimeout(() => {
                    this.setState({ loading: false });
                  }, 2000);
                }}>
                {itemsRender}
              </Pull>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
