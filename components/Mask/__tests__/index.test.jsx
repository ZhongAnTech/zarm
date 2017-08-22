import React from 'react';
import renderer from 'react-test-renderer';
import Mask from '../index';

describe('Mask', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Mask visible />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
