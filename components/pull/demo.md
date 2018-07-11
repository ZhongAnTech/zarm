## 上拉加载下拉刷新 Pull

:::demo 基本用法
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

function getRandomNum(min, max) {
  const Range = max - min;
  const Rand = Math.random();
  return (min + Math.round(Rand * Range));
}

class Demo extends React.Component {
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
  fetchData(key) {
    this.setState({ [`${key}`]: REFRESH_STATE.loading });
    setTimeout(() => {
      if (!this.mounted) return;

      const dataSource = [];
      const { length } = dataSource;

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
  loadData() {
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
      <div>
        <Pull
          refresh={{
            state: customRefreshing,
            handler: () => this.fetchData('customRefreshing'),
            // render: (refreshState, percent) => {
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
            // },
          }}
          load={{
            state: customLoading,
            handler: () => this.loadData(),
            // render: (loadState) => {
            //   const cls = 'custom-control';
            //   switch (loadState) {
            //     case LOAD_STATE.loading:
            //       return <div className={cls}><Spinner className="rotate360" /></div>;

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
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-pull | | 类名前缀 |
| className | string | | | 追加类名 |
| refresh | Action | | | 下拉刷新的参数配置 |
| load | Action |  | | 上拉加载的参数配置 |
| animationDuration | number | 400 | | 动画执行时间，单位：毫秒 |
| stayTime | number | 1000 | | 加载成功停留时间 |

#### Action 类型定义
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| state | REFRESH_STATE &#124; LOAD_STATE | 0 | | 状态枚举 |
| startDistance | number | 20 | | 下拉时的助跑距离 |
| distance | number | 50 | | 触发距离阀值 |
| render | <code>(refreshState: REFRESH_STATE &#124; LOAD_STATE, percent: number) => any</code> | | | 各状态渲染的回调函数 |
| handler | <code>() => void</code> | | | 达到阀值后释放触发的回调函数 |

:::