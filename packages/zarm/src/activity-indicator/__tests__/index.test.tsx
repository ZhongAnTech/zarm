import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActivityIndicator from '../index';

describe('ActivityIndicator', () => {
  it('renders correctly', () => {
    const wrapper = render(<ActivityIndicator loading={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders spinner correctly', () => {
    const wrapper = render(<ActivityIndicator type="spinner" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Spinner', () => {
    it('should render with HTML div element attributes', () => {
      const wrapper = render(
        <ActivityIndicator type="spinner" spellCheck style={{ width: '100px', height: '100px' }} />,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Circular', () => {
    it('should render with HTML div element attributes', () => {
      const wrapper = render(
        <ActivityIndicator spellCheck style={{ width: '100px', height: '100px' }} />,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
