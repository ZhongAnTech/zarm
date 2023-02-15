import React, { useRef } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import Pull from '../index';
import List from '../../list';

const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5 // 加载失败
};

const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5 // 加载完成（无新数据）
};

const getRandomNum = (min, max) => {
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
};

const fetchData = (length, dataSource: Array<any>) => {
  const newData: Array<any> = dataSource;
  const startIndex = newData.length;
  for (let i = startIndex; i < startIndex + length; i++) {
    newData.push(<List.Item key={+i} title={`第 ${i + 1} 行`} />);
  }
  return newData;
};

describe('Pull', () => {
  const App = () => {
    const [dataSource, setDataSource] = React.useState<Array<any>>([]);
    const [refreshing, setRefreshing] = React.useState(REFRESH_STATE.normal);
    const [loading, setLoading] = React.useState(LOAD_STATE.normal);
    const count = useRef(0);

    const refreshData = () => {
      setRefreshing(REFRESH_STATE.loading);
      setTimeout(() => {
        if (count.current > 0) {
          setRefreshing(REFRESH_STATE.failure);
          return;
        }
        setDataSource(fetchData(20, []));
        setRefreshing(REFRESH_STATE.success);
        count.current += 1;
      }, 2000);
      // setDataSource(fetchData(20, []));
      // setRefreshing(REFRESH_STATE.success);
    };

  // 模拟加载更多数据
    const loadData = () => {
      setLoading(LOAD_STATE.loading);
      setTimeout(() => {
        setDataSource(fetchData(20, []));
        setLoading(LOAD_STATE.complete);
      }, 2000);
    };

    React.useEffect(() => {
      setDataSource(fetchData(20, []));
    }, []);
    return (
      <Pull
        refresh={{
          state: refreshing,
          handler: refreshData
        }}
        load={{
          state: loading,
          distance: 200,
          handler: loadData
        }}
      >
        <List>{dataSource}</List>
    </Pull>);
  }
  it('renders correctly', () => {
    const { container } = render(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>,
    );
    expect(container).toMatchSnapshot();
  });

  it('refreshing', async () => {
    jest.useFakeTimers();
    const { container, getByText } = render(
      <App />
    );
    const pull = container.querySelector('.za-pull');
    fireEvent.mouseDown(pull!, { pointerId: 15, clientX: 100, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(pull!, { pointerId: 15, clientX: 100, clientY: 100, buttons: 1 });
    fireEvent.mouseMove(pull!, { pointerId: 15, clientX: 150, clientY: 300, buttons: 1 });
    fireEvent.mouseUp(pull!, { pointerId: 15 });
    act(() => {
      jest.runAllTimers();
    })
    await waitFor(() => {
      expect(getByText('加载成功')).toBeInTheDocument();
    });
  });

  it('loading', async () => {
    jest.useFakeTimers();
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });

    const clientHeightSpy = jest
    .spyOn(document.documentElement, 'clientHeight', 'get')
    .mockImplementation(() => 100);

    const scrollHeightSpy = jest
    .spyOn(document.body, 'clientHeight', 'get')
    .mockImplementation(() => 1000);

    const { getByText } = render(
      <App />
    );
    window.scrollTo(0, 800);
    fireEvent.scroll(window, { scrollY: -100 });
    act(() => {
      jest.runOnlyPendingTimers();
    })
    await waitFor(() => {
      expect(getByText('我是有底线的')).toBeInTheDocument();
    })
    scrollToSpy.mockRestore();
    scrollHeightSpy.mockRestore();
    clientHeightSpy.mockRestore();
  });
})