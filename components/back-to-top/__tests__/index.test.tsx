import React from 'react';
import type { CSSProperties } from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import BackToTop from '../index';

function genItems(count: number): Array<HTMLLIElement> {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(<li key={+i}>第 {i + 1} 行</li>);
  }
  return list;
}

describe('BackToTop', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = mount(<BackToTop>Up</BackToTop>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('scrollContainer', () => {
      const containerStyle: CSSProperties = {
        overflowY: 'auto',
        maxHeight: 400,
      };
      let container;
      const wrapper = mount(
        <>
          <ul
            ref={(ele) => {
              container = ele;
            }}
            style={containerStyle}
          >
            {genItems(100)}
          </ul>
          <BackToTop scrollContainer={() => container}>Up</BackToTop>
        </>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('click event', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<BackToTop onClick={onClick}>Up</BackToTop>);
    window.scrollTo = jest.fn();
    window.scrollTo(0, 1000);
    jest.useFakeTimers();
    wrapper.find('.za-back-to-top').simulate('click');
    jest.runAllTimers();
    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(onClick).toBeCalled();
  });

  it('set the value of `speed` to 0 ', () => {
    const wrapper = shallow(<BackToTop>Up</BackToTop>);
    window.scrollTo = jest.fn();
    window.scrollTo(0, 1000);
    wrapper.setProps({ speed: 0 });
    wrapper.find('.za-back-to-top').simulate('click');
    expect(window.scrollTo).toBeCalledWith(0, 0);
  });
});
