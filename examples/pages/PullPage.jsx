import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Pull, Spinner } from '../../components';
import '../styles/pages/PullPage';

const REFRESH_STATE = {
  normal: 0,  // 普通
  pull: 1,    // 下拉刷新（未满足刷新条件）
  drop: 2,    // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

const LOAD_STATE = {
  normal: 0,  // 普通
  complete: 1, // 加载完成（无新数据）
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
};

const logo = require('../images/icons/state.png');

class Page extends Component {

  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      loading: LOAD_STATE.normal,
      refreshing: REFRESH_STATE.normal,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.fetchData('customRefreshing');
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // 模拟请求数据
  fetchData(key) {
    this.setState({ [`${key}`]: REFRESH_STATE.loading });
    setTimeout(() => {
      if (!this.mounted) return;

      const dataSource = [];
      const length = dataSource.length;

      for (let i = length; i < length + 20; i++) {
        dataSource.push(<Cell key={+i}>第 {i + 1} 行</Cell>);
      }

      this.setState({
        dataSource,
        [`${key}`]: REFRESH_STATE.success,
      });
    }, 2000);
  }

  getRandomNum(min, max) {
    const Range = max - min;
    const Rand = Math.random();
    return(min + Math.round(Rand * Range));
  } 

  // 模拟加载更多数据
  loadData() {
    this.setState({ customLoading: LOAD_STATE.loading });
    setTimeout(() => {
      if (!this.mounted) return;

      const randomNum = this.getRandomNum(0, 5);
      let dataSource = this.state.dataSource;
      let customLoading = LOAD_STATE.success;

      console.log(`状态: ${randomNum === 0 ? '失败' : (randomNum === 1 ? '完成' : '成功')}`);

      if (randomNum === 0) {
        customLoading = LOAD_STATE.failure;
      } else if (randomNum === 1) {
        customLoading = LOAD_STATE.complete;
      } else {
        const newLength = 5;
        const startIndex = dataSource.length;
        for (let i = startIndex; i < startIndex + newLength; i++) {
          dataSource.push(<Cell key={+i}>第 {i + 1} 行</Cell>);
        }
      }

      this.setState({
        dataSource,
        customLoading,
      });
    }, 2000);
  }

  render() {
    const { refreshing, customRefreshing, customLoading, dataSource } = this.state;

    const itemsRender = [];
    for (let i = 0; i < 3; i++) {
      itemsRender.push(<Cell key={+i}>第 {i + 1} 行</Cell>);
    }

    return (
      <Container className="pull-page">
        <Header title="上拉加载 PullUp" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Pull
                refreshing={refreshing}
                onRefresh={() => {
                  this.fetchData('refreshing');
                }}>
                {itemsRender}
              </Pull>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="自定义（下拉刷新 + 上拉加载）" />
            <Panel.Body>
              <Pull
                refreshing={customRefreshing}
                onRefresh={() => {
                  this.fetchData('customRefreshing');
                }}
                initialDistance={0}
                refreshDistance={80}
                refreshRender={(actionState, percent) => {
                  const cls = 'custom-control';
                  switch (actionState) {
                    case REFRESH_STATE.pull:
                      return <div className={cls} style={{ transform: `scale(${percent / 100})` }}><img src={logo} alt="" /></div>;

                    case REFRESH_STATE.drop:
                      return <div className={cls}>释放立即刷新</div>;

                    case REFRESH_STATE.loading:
                      return <div className={cls}><Spinner className="rotate360" /></div>;

                    case REFRESH_STATE.success:
                      return <div className={cls}>加载成功</div>;

                    case REFRESH_STATE.failure:
                      return <div className={cls}>加载失败</div>;
                  }
                }}
                loading={customLoading}
                onLoad={() => {
                  this.loadData();
                }}>
                {dataSource}
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
