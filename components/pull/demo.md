# Pull 上拉加载下拉刷新



## 基本用法
```jsx
import { Pull, Cell } from 'zarm';

const REFRESH_STATE = {
  normal: 0,  // 普通
  pull: 1,    // 下拉刷新（未满足刷新条件）
  drop: 2,    // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

const LOAD_STATE = {
  normal: 0,   // 普通
  abort: 1,    // 中止
  loading: 2,  // 加载中
  success: 3,  // 加载成功
  failure: 4,  // 加载失败
  complete: 5, // 加载完成（无新数据）
};

const getRandomNum = (min, max) => {
  const Range = max - min;
  const Rand = Math.random();
  return (min + Math.round(Rand * Range));
}

class Demo extends React.Component {
  mounted = true;

  state = {
    refreshing: REFRESH_STATE.normal,
    loading: LOAD_STATE.normal,
    dataSource: [],
  };

  componentDidMount() {
    this.appendData(20);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // 模拟请求数据
  refreshData = () => {
    this.setState({ refreshing: REFRESH_STATE.loading });
    setTimeout(() => {
      if (!this.mounted) return;

      this.appendData(20, []);
      this.setState({
        refreshing: REFRESH_STATE.success,
      });
    }, 2000);
  }

  // 模拟加载更多数据
  loadData = () => {
    this.setState({ loading: LOAD_STATE.loading });
    setTimeout(() => {
      if (!this.mounted) return;

      const randomNum = getRandomNum(0, 5);
      const { dataSource } = this.state;
      let loading = LOAD_STATE.success;

      console.log(`状态: ${randomNum === 0 ? '失败' : (randomNum === 1 ? '完成' : '成功')}`);

      if (randomNum === 0) {
        loading = LOAD_STATE.failure;
      } else if (randomNum === 1) {
        loading = LOAD_STATE.complete;
      } else {
        this.appendData(20);
      }

      this.setState({ loading });
    }, 2000);
  }

  appendData(length, dataSource) {
    dataSource = dataSource || this.state.dataSource;
    const startIndex = dataSource.length;
    for (let i = startIndex; i < startIndex + length; i++) {
      dataSource.push(<Cell key={+i}>第 {i + 1} 行</Cell>);
    }
    this.setState({ dataSource });
  }

  render() {
    const { refreshing, loading, dataSource } = this.state;
    return (
      <Pull
        refresh={{
          state: refreshing,
          handler: this.refreshData,
          // render: (refreshState, percent) => {
          //   const cls = 'custom-control';
          //   switch (refreshState) {
          //     case REFRESH_STATE.pull:
          //       return (
          //         <div className={cls}>
          //           <ActivityIndicator loading={false} percent={percent} />
          //           <span>下拉刷新</span>
          //         </div>
          //       );

          //     case REFRESH_STATE.drop:
          //       return (
          //         <div className={cls}>
          //           <ActivityIndicator loading={false} percent={100} />
          //           <span>释放立即刷新</span>
          //         </div>
          //       );

          //     case REFRESH_STATE.loading:
          //       return (
          //         <div className={cls}>
          //           <ActivityIndicator type="spinner" />
          //           <span>加载中</span>
          //         </div>
          //       );

          //     case REFRESH_STATE.success:
          //       return (
          //         <div className={cls}>
          //           <Icon type="right-round" theme="success" />
          //           <span>加载成功</span>
          //         </div>
          //       );

          //     case REFRESH_STATE.failure:
          //       return (
          //         <div className={cls}>
          //           <Icon type="wrong-round" theme="danger" />
          //           <span>加载失败</span>
          //         </div>
          //       );

          //     default:
          //   }
          // },
        }}
        load={{
          state: loading,
          distance: 200,
          handler: this.loadData,
          // render: (loadState) => {
          //   const cls = 'custom-control';
          //   switch (loadState) {
          //     case LOAD_STATE.loading:
          //       return <div className={cls}><ActivityIndicator type="spinner" /></div>;

          //     case LOAD_STATE.failure:
          //       return <div className={cls}>加载失败</div>;

          //     case LOAD_STATE.complete:
          //       return <div className={cls}>我是有底线的</div>;
          //   }
          // },
        }}
      >
        {dataSource}
      </Pull>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| refresh | Action | - | 下拉刷新的参数配置 |
| load | Action | - | 上拉加载的参数配置 |
| animationDuration | number | 400 | 动画执行时间，单位：毫秒 |
| stayTime | number | 1000 | 加载成功停留时间 |

### Action 类型定义
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| state | REFRESH_STATE &#124; LOAD_STATE | 0 | 状态枚举 |
| startDistance | number | 20 | 下拉时的助跑距离，单位：px |
| distance | number | 50 | 触发距离阀值，单位：px |
| render | (refreshState: REFRESH_STATE &#124; LOAD_STATE, percent: number) => ReactNode | - | 各状态渲染的回调函数 |
| handler | () => void | - | 达到阀值后释放触发的回调函数 |

### REFRESH_STATE 枚举定义
| 枚举值 | 说明 |
| :--- | :--- |
| normal | 普通状态 |
| pull | 下拉状态（未满足刷新条件） |
| drop | 释放立即刷新（满足刷新条件） |
| loading | 加载中 |
| success | 加载成功 |
| failure | 加载失败 |

### LOAD_STATE 枚举定义
| 枚举值 | 说明 |
| :--- | :--- |
| normal | 普通状态 |
| abort | 终止状态 |
| loading | 加载中 |
| success | 加载成功 |
| failure | 加载失败 |
| complete | 加载完成 |