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
  refreshing={this.state.refreshing}
  onRefresh={() => {
    this.setState({ refreshing: REFRESH_STATE.loading });
    setTimeout(() => {
      this.setState({ refreshing: REFRESH_STATE.success });
    }, 2000);
  }}>
  foo
</Pull>
```

###### 自定义
```jsx
<Pull
  refreshing={this.state.refreshing}
  refreshInitDistance={0}
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
  onRefresh={() => {
    this.setState({ refreshing: REFRESH_STATE.loading });
    setTimeout(() => {
      this.setState({ refreshing: REFRESH_STATE.success });
    }, 2000);
  }}>
  foo
</Pull>
```

#### 上拉加载

###### 基本
```jsx
<Pull
  loading={this.state.loading}
  onLoad={() => {
    this.setState({ loading: LOAD_STATE.loading });
    setTimeout(() => {
      this.setState({ loading: LOAD_STATE.success });
    }, 2000);
  }}>
  foo
</Pull>
```

###### 自定义
```jsx
<Pull
  loading={this.state.loading}
  loadRender={(loadState) => {
    const cls = 'custom-control';
    switch (loadState) {
      case LOAD_STATE.loading:
        return <div className={cls}><Spinner className="rotate360" /></div>;

      case LOAD_STATE.failure:
        return <div className={cls}>加载失败</div>;

      case LOAD_STATE.complete:
        return <div className={cls}>我是有底线的</div>;
    }
  }}
  onLoad={() => {
    this.setState({ loading: LOAD_STATE.loading });
    setTimeout(() => {
      this.setState({ loading: LOAD_STATE.success });
    }, 2000);
  }}>
  foo
</Pull>
```

### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-pull | | 类名前缀 |
| className | string | | | 追加类名 |
| refreshing | number | 0 | 下拉刷新状态枚举（0-5） |下拉刷新的状态 |
| refreshInitDistance | number | 20 | | 下拉助跑距离 |
| refreshDistance | number | 50 | | 触发下拉刷新离顶部的距离阀值 |
| refreshRender | func | | | 下拉各状态渲染的回调函数 |
| onRefresh | func | | | 达到阀值后释放触发刷新的回调函数 |
| loading | number | 0 | 上拉加载状态枚举（0-5） | 上拉加载的状态 |
| loadDistance | number | 10 | | 触发上拉加载离底部的距离阀值 |
| loadRender | func | | | 上拉各状态渲染的回调函数 |
| onLoad | func | | | 触发上拉加载后的回调函数 |
| animationDuration | number | 400 | | 动画执行时间，单位：毫秒 |
| stayTime | number | 1000 | | 加载成功停留时间 |



