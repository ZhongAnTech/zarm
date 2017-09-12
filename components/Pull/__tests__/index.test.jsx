import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pull from '../index';

describe('Pull', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('refreshing', () => {
    const wrapper = shallow(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>
    );
    wrapper.setProps({ refreshing: true });
  });

  it('custom', () => {
    const onRefresh = jest.fn();
    const wrapper = shallow(
      <Pull
        moveDistance={80}
        onRefresh={onRefresh}
        pullDownRender={(actionState, percent) => {
          const cls = 'custom-control';
          switch (actionState) {
            case 'pull':
              return (
                <div className={cls}>下拉刷新 {percent}</div>
              );

            case 'drop':
              return (
                <div className={cls}>释放刷新</div>
              );

            case 'loading':
              return (
                <div className={cls}>加载中</div>
              );

            case 'success':
              return (
                <div className={cls}>加载成功</div>
              );

            default:
              return null;
          }
        }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>
    );
    wrapper.setProps({ refreshing: true });
  });
});
