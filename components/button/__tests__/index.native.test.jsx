import { TouchableHighlight, Text } from 'react-native';
import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../index.native';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(<Button>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('theme', () => {
    const wrapper = render(<Button theme="primary">foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('block', () => {
    const wrapper = render(<Button block>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('ghost', () => {
    const wrapper = render(<Button ghost>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('size', () => {
    const wrapper = render(<Button size="lg">foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('shape is radius', () => {
    const wrapper = render(<Button shape="radius">foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('children is valid element', () => {
    const wrapper = render(
      <Button>
        <Text>foo</Text>
      </Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('icon', () => {
    const wrapper = render(
      <Button icon={<img alt="" src="https://zarm.design/images/logo.ce68565d.svg" />}>foo</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('loading', () => {
    const wrapper = render(<Button loading>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = render(<Button disabled>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick}>foo</Button>);
    wrapper.find(TouchableHighlight).props().onPress();
    expect(onClick).toBeCalled();
  });

  it('pressIn', () => {
    const wrapper = shallow(<Button>foo</Button>);
    wrapper.find(TouchableHighlight).props().onPressIn();
    expect(wrapper.state('isActive')).toBe(true);
  });

  it('pressOut', () => {
    const wrapper = shallow(<Button>foo</Button>);
    wrapper.find(TouchableHighlight).props().onPressOut();
    expect(wrapper.state('isActive')).toBe(false);
  });

  it('ghost active', () => {
    const wrapper = shallow(<Button ghost>foo</Button>);
    wrapper.setState({ isActive: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('ghost disabled', () => {
    const wrapper = shallow(
      <Button ghost disabled>
        foo
      </Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('circle size', () => {
    const wrapper = render(
      <Button shape="circle" size="lg">
        foo
      </Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
