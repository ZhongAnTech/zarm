import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Pull } from '../../components';
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
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};

function getRandomNum(min, max) {
  const Range = max - min;
  const Rand = Math.random();
  return (min + Math.round(Rand * Range));
}

class Page extends Component {

  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      customRefreshing: REFRESH_STATE.normal,
      customLoading: LOAD_STATE.normal,
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
  fetchData = (key) => {
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

  // 模拟加载更多数据
  loadData = () => {
    this.setState({ customLoading: LOAD_STATE.loading });
    setTimeout(() => {
      if (!this.mounted) return;

      const randomNum = getRandomNum(0, 5);
      const { dataSource } = this.state;
      let customLoading = LOAD_STATE.success;

      // eslint-disable-next-line
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
    const { customRefreshing, customLoading, dataSource } = this.state;

    const itemsRender = [];
    for (let i = 0; i < 3; i++) {
      itemsRender.push(<Cell key={+i}>第 {i + 1} 行</Cell>);
    }

    return (
      <Container className="pull-page">
        <Header title="上拉加载下拉刷新 Pull" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Pull
                // initialDistance={0}
                // refreshDistance={80}
                // refreshRender={(refreshState, percent) => {
                //   const cls = 'custom-control';
                //   switch (refreshState) {
                //     case REFRESH_STATE.pull:
                //       return <div className={cls} style={{ transform: `scale(${percent / 100})` }}><img src={logo} alt="" /></div>;

                //     case REFRESH_STATE.drop:
                //       return <div className={`${cls} rotate360`}><img src={logo} alt="" /></div>;

                //     case REFRESH_STATE.loading:
                //       return <div className={cls}><Spinner className="rotate360" /></div>;

                //     case REFRESH_STATE.success:
                //       return <div className={cls}>加载成功</div>;

                //     case REFRESH_STATE.failure:
                //       return <div className={cls}>加载失败</div>;
                //   }
                // }}
                // loadRender={(loadState) => {
                //   const cls = 'custom-control';
                //   switch (loadState) {
                //     case LOAD_STATE.loading:
                //       return <div className={cls}><Spinner className="rotate360" /></div>;

                //     case LOAD_STATE.failure:
                //       return <div className={cls}>加载失败</div>;

                //     case LOAD_STATE.complete:
                //       return <div className={cls}>我是有底线的</div>;
                //   }
                // }}
                refreshing={customRefreshing}
                loading={customLoading}
                onRefresh={() => {
                  this.fetchData('customRefreshing');
                }}
                onLoad={this.loadData}>
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
