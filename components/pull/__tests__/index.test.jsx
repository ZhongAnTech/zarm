import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pull from '../index';

describe('Pull', () => {
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

  it('renders correctly', () => {
    const wrapper = render(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('refreshing', () => {
    const wrapper = shallow(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>,
    );
    wrapper.setProps({
      refresh: {
        state: REFRESH_STATE.loading,
      },
    });
  });

  it('loading', () => {
    const wrapper = shallow(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>,
    );
    wrapper.setProps({
      load: {
        state: REFRESH_STATE.loading,
      },
    });
  });

  it('custom', () => {
    jest.useFakeTimers();
    const onRefresh = jest.fn();
    const onLoad = jest.fn();
    const wrapper = shallow(
      <Pull
        refresh={{
          startDistance: 0,
          distance: 80,
          render: (actionState, percent) => {
            switch (actionState) {
              case REFRESH_STATE.pull:
                return <div>下拉刷新 {percent}</div>;

              case REFRESH_STATE.drop:
                return <div>释放刷新</div>;

              case REFRESH_STATE.loading:
                return <div>加载中</div>;

              case REFRESH_STATE.success:
                return <div>加载成功</div>;

              case REFRESH_STATE.failure:
                return <div>加载失败</div>;
            }
          },
          handler: onRefresh,
        }}
        load={{
          render: (loadState) => {
            switch (loadState) {
              case LOAD_STATE.loading:
                return <div>加载中</div>;

              case LOAD_STATE.failure:
                return <div>加载失败</div>;

              case LOAD_STATE.complete:
                return <div>我是有底线的</div>;
            }
          },
          handler: onLoad,
        }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>,
    );
    wrapper.setProps({ refresh: { state: REFRESH_STATE.pull } });
    wrapper.setProps({ refresh: { state: REFRESH_STATE.drop } });
    wrapper.setProps({ refresh: { state: REFRESH_STATE.loading } });
    wrapper.setProps({ refresh: { state: REFRESH_STATE.success } });
    wrapper.setProps({ refresh: { state: REFRESH_STATE.failure } });
    jest.runAllTimers();
    wrapper.setProps({ load: { state: LOAD_STATE.loading } });
    wrapper.setProps({ load: { state: LOAD_STATE.success } });
    wrapper.setProps({ load: { state: LOAD_STATE.failure } });
    jest.runAllTimers();
    wrapper.setProps({ load: { state: LOAD_STATE.complete } });
    wrapper.setProps({ load: { state: LOAD_STATE.abort } });
    wrapper.unmount();
  });

  it('refreshing', () => {
    const wrapper = shallow(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>,
    );
    wrapper.simulate('touchStart', {
      touches: [0, 0],
    });
    wrapper.simulate('touchMove', {
      touches: [0, 50],
    });
    wrapper.simulate('touchEnd', {
      touches: [0, 100],
    });
  });
});
