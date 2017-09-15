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

#### 基本用法

###### 下拉刷新
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

###### 下拉刷新（自定义显示）
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

###### 上拉加载
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

### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-pull | | 类名前缀 |
| className | string | | | 追加类名 |
| refreshing | bool | false | 是否正在刷新 |
| refreshInitDistance | number | 20 | | 下拉助跑距离 |
| refreshDistance | number | 60 | | 下拉距离阀值 |
| refreshRender | func | | | 下拉各状态渲染的回调函数 |
| onRefresh | func | | | 达到阀值后释放触发刷新的回调函数 |
| loading | bool | false | 是否正在加载 |
| onLoad | func | | | 触发上拉加载后的回调函数 |
| loadRender | func | | | 上拉各状态渲染的回调函数 |
| duration | number | 300 | | 动画执行时间，单位：ms |
| stayTime | number | 2000 | | 加载成功停留时间 |



