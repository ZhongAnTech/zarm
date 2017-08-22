import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../index';

describe('Icon', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Icon type="right" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
