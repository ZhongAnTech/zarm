/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable dot-notation */
import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import PinchZoom from '../index';

describe('PinchZoom', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = render(<PinchZoom />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
