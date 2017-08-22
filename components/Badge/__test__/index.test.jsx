import React from 'react';
import renderer from 'react-test-renderer';
import Badge from '../index';

describe('Badge', () => {
  it('renders shape is dot correctly', () => {
    const component = renderer.create(<Badge shape="dot" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
