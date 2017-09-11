import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Pull, Spinner } from '../../components';
import '../styles/pages/PullPage';

const logo = require('../images/icons/state.png');

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing1: false,
      refreshing2: false,
    };
  }

  componentDidMount() {
    this.fetchData('refreshing1');
  }

  // 模拟请求数据
  fetchData(key) {
    this.setState({ [`${key}`]: true });
    setTimeout(() => {
      this.setState({ [`${key}`]: false });
    }, 2000);
  }

  render() {
    const itemsRender = [];
    for (let i = 0; i < 4; i++) {
      itemsRender.push(<Cell key={+i}>第 {i + 1} 行</Cell>);
    }

    return (
      <Container className="pull-page">
        <Header title="下拉刷新 Pull" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Pull
                refreshing={this.state.refreshing1}
                onRefresh={() => {
                  this.fetchData('refreshing1');
                }}>
                {itemsRender}
              </Pull>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="自定义样式" />
            <Panel.Body>
              <Pull
                refreshing={this.state.refreshing2}
                moveDistance={80}
                onRefresh={() => {
                  this.fetchData('refreshing2');
                }}
                pullDownRender={(actionState, percent) => {
                  const cls = 'custom-control';
                  switch (actionState) {
                    case 'pull':
                    case 'drop':
                      return (
                        <div className={cls} style={{ transform: `scale(${percent / 100})` }}>
                          <img src={logo} alt="" />
                        </div>
                      );

                    case 'loading':
                      return (
                        <div className={cls}>
                          <Spinner className="rotate360" />
                        </div>
                      );

                    case 'success':
                      return (
                        <div className={cls}>
                          加载成功
                        </div>
                      );

                    default:
                      return null;
                  }
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
