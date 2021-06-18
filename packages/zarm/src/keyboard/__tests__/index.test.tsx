import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Keyboard from '../index';

describe('Keyboard', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = render(<Keyboard />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('type is price', () => {
      const wrapper = render(<Keyboard type="price" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('type is idcard', () => {
      const wrapper = render(<Keyboard type="idcard" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.useRealTimers();
    });

    it('should handle ok', () => {
      const mOnKeyClick = jest.fn();
      const wrapper = mount(<Keyboard onKeyClick={mOnKeyClick} />);
      wrapper.find('.za-keyboard__item--ok').simulate('click');
      expect(mOnKeyClick).toBeCalledWith('ok');
    });
  });
});
