import React from 'react';
import renderer from 'react-test-renderer';
import Cell from '../index';

describe('Cell', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Cell />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
