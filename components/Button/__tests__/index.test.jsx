import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../index';

describe('Button', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Button>foo</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
