# 上拉加载下拉刷新 Pull

[demo页面](https://zhongantecheng.github.io/zarm/#/pull)

### 引入

```js
import { Pull } from 'zarm';
```

### 代码演示

#### 状态枚举
```js
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
```

#### 下拉刷新

###### 基本
```jsx
<Pull
  refresh={{
    state: this.state.refresh,
    refresh: () => {
      this.setState({ refresh: REFRESH_STATE.loading });
      setTimeout(() => {
        this.setState({ refresh: REFRESH_STATE.success });
      }, 2000);
    },
  }}>
  foo
</Pull>
```

###### 自定义
```jsx
<Pull
  refresh={{
    state: this.state.refresh,
    startDistance: 0,
    distance: 80,
    handler: () => {
      this.setState({ refresh: REFRESH_STATE.loading });
      setTimeout(() => {
        this.setState({ refresh: REFRESH_STATE.success });
      }, 2000);
    },
    render: (actionState, percent) => {
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
    },
  }}>
  foo
</Pull>
```

#### 上拉加载

###### 基本
```jsx
<Pull
  load={{
    state: this.state.load,
    handler: () => {
      this.setState({ load: LOAD_STATE.loading });
      setTimeout(() => {
        this.setState({ load: LOAD_STATE.success });
      }, 2000);
    },
  }}>
  foo
</Pull>
```

###### 自定义
```jsx
<Pull
  load={{
    state: this.state.load,
    handler: () => {
      this.setState({ load: LOAD_STATE.loading });
      setTimeout(() => {
        this.setState({ load: LOAD_STATE.success });
      }, 2000);
    },
    render: (loadState) => {
      const cls = 'custom-control';
      switch (loadState) {
        case LOAD_STATE.loading:
          return <div className={cls}><Spinner className="rotate360" /></div>;

        case LOAD_STATE.failure:
          return <div className={cls}>加载失败</div>;

        case LOAD_STATE.complete:
          return <div className={cls}>我是有底线的</div>;
      }
    },
  }}>
  foo
</Pull>
```

### API

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



