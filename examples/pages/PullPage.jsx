import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Pull, Spinner } from '../../components';
import '../styles/pages/PullPage';

const ACTION_STATE = {
  normal: 0,  // 普通
  pull: 1,    // 下拉状态（未满足刷新条件）
  drop: 2,    // 可释放状态（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
}

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
                initialDistance={0}
                refreshDistance={80}
                onRefresh={() => {
                  this.fetchData('refreshing2');
                }}
                refreshRender={(actionState, percent) => {
                  const cls = 'custom-control';

                  switch (actionState) {
                    case ACTION_STATE.pull:
                      return (
                        <div className={cls} style={{ transform: `scale(${percent / 100})` }}>
                          <img src={logo} alt="" />
                        </div>
                      );

                    case ACTION_STATE.drop:
                      return (
                        <div className={cls}>
                          释放加载
                        </div>
                      );

                    case ACTION_STATE.loading:
                      return (
                        <div className={cls}>
                          <Spinner className="rotate360" />
                        </div>
                      );

                    case ACTION_STATE.success:
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
