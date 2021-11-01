# Pull 上拉加载下拉刷新

## 基本用法

```jsx
import { useState, useEffect, useRef } from 'react';
import { Pull, List, Message, Button, ActivityIndicator, BackToTop } from 'zarm';
import { WarningCircle, SuccessCircle, CloseCircle } from '@zarm-design/icons';

const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};

const getRandomNum = (min, max) => {
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
};

const fetchData = (length, dataSource = []) => {
  let newData = [].concat(dataSource);
  const startIndex = newData.length;
  for (let i = startIndex; i < startIndex + length; i++) {
    newData.push(<List.Item key={+i} title={`第 ${i + 1} 行`} />);
  }
  return newData;
};

let mounted = true;

const Demo = () => {
  const pullRef = useRef();
  const [bodyScroll, setBodyScroll] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  const [loading, setLoading] = useState(LOAD_STATE.normal);

  const toggleScrollContainer = () => {
    const newBodyScroll = !bodyScroll;
    setBodyScroll(newBodyScroll);

    if (newBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  // 模拟请求数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    setTimeout(() => {
      if (!mounted) return;
      setDataSource(fetchData(20));
      setRefreshing(REFRESH_STATE.success);
    }, 2000);
  };

  // 模拟加载更多数据
  const loadData = () => {
    setLoading(LOAD_STATE.loading);
    setTimeout(() => {
      if (!mounted) return;

      const randomNum = getRandomNum(0, 5);
      console.log(`状态: ${randomNum === 0 ? '失败' : randomNum === 1 ? '完成' : '成功'}`);

      let loadingState = LOAD_STATE.success;
      if (randomNum === 0) {
        loadingState = LOAD_STATE.failure;
      } else if (randomNum === 1) {
        loadingState = LOAD_STATE.complete;
      } else {
        setDataSource(fetchData(20, dataSource));
      }

      setLoading(loadingState);
    }, 2000);
  };

  useEffect(() => {
    setDataSource(fetchData(20));

    return () => {
      mounted = false;
      document.body.style.overflow = 'auto';
    };
  }, []);

  const style = bodyScroll ? {} : { overflowY: 'auto', maxHeight: 400 };

  const scrollContainer = () => {
    return bodyScroll ? window : pullRef.current && pullRef.current.scrollContainer;
  };

  return (
    <>
      <Message theme="warning" icon={<WarningCircle />}>
        当前使用的是 `{bodyScroll ? 'window' : 'div'}` 作为滚动容器。
        <Button theme="primary" size="xs" onClick={toggleScrollContainer}>
          点击切换
        </Button>
      </Message>
      <Pull
        ref={pullRef}
        style={style}
        refresh={{
          state: refreshing,
          handler: refreshData,
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
          //           <SuccessCircle theme="success" />
          //           <span>加载成功</span>
          //         </div>
          //       );

          //     case REFRESH_STATE.failure:
          //       return (
          //         <div className={cls}>
          //           <CloseCircle theme="danger" />
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
          handler: loadData,
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
        <List>{dataSource}</List>
      </Pull>
      <BackToTop scrollContainer={scrollContainer} onClick={() => console.log('click back to top')}>
        <div
          style={{
            width: 60,
            height: 60,
            lineHeight: '60px',
            textAlign: 'center',
            backgroundColor: '#fff',
            color: '#999',
            fontSize: 20,
            borderRadius: 30,
            boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          }}
        >
          Up
        </div>
      </BackToTop>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性              | 类型   | 默认值 | 说明                     |
| :---------------- | :----- | :----- | :----------------------- |
| refresh           | Action | -      | 下拉刷新的参数配置       |
| load              | Action | -      | 上拉加载的参数配置       |
| animationDuration | number | 400    | 动画执行时间，单位：毫秒 |
| stayTime          | number | 1000   | 加载成功停留时间         |

### Action 类型定义

| 属性          | 类型                                                                          | 默认值 | 说明                                                                  |
| :------------ | :---------------------------------------------------------------------------- | :----- | :-------------------------------------------------------------------- |
| state         | REFRESH_STATE &#124; LOAD_STATE                                               | 0      | 状态枚举                                                              |
| startDistance | number                                                                        | 30     | 下拉时的助跑距离，单位：px                                            |
| distance      | number                                                                        | 30     | 触发距离阀值，单位：px；下拉刷新阀值默认为 30px，上拉加载阀值默认为 0 |
| render        | (refreshState: REFRESH_STATE &#124; LOAD_STATE, percent: number) => ReactNode | -      | 各状态渲染的回调函数                                                  |
| handler       | () => void                                                                    | -      | 达到阀值后释放触发的回调函数                                          |

### REFRESH_STATE 枚举定义

| 枚举值  | 说明                         |
| :------ | :--------------------------- |
| normal  | 普通状态                     |
| pull    | 下拉状态（未满足刷新条件）   |
| drop    | 释放立即刷新（满足刷新条件） |
| loading | 加载中                       |
| success | 加载成功                     |
| failure | 加载失败                     |

### LOAD_STATE 枚举定义

| 枚举值   | 说明     |
| :------- | :------- |
| normal   | 普通状态 |
| abort    | 终止状态 |
| loading  | 加载中   |
| success  | 加载成功 |
| failure  | 加载失败 |
| complete | 加载完成 |
