import { TouchableHighlight } from 'react-native';
import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Cell from '../index.native';

describe('Cell', () => {
  it('renders correctly', () => {
    const wrapper = render(<Cell title="标题文字" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('description', () => {
    const wrapper = render(<Cell title="标题文字" description="描述文字" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('hasArrow', () => {
    const wrapper = render(<Cell hasArrow title="标题文字" description="描述文字">我是Cell</Cell>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('icon', () => {
    const wrapper = render(<Cell title="标题文字" description="描述文字" icon={<img alt="" src="\\static.zhongan.com/website/health/zarm/images/icons/state.png" />}>我是Cell</Cell>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('children', () => {
    const wrapper = render(<Cell title="标题文字">我是Cell</Cell>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('help', () => {
    const wrapper = render(<Cell title="标题文字" description="描述文字" help="我是help" icon={<img alt="" src="\\static.zhongan.com/website/health/zarm/images/icons/state.png" />} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Cell hasArrow onClick={onClick}>我是Cell</Cell>);
    wrapper.find(TouchableHighlight).props().onPress();
    expect(onClick).toBeCalled();
  });

  it('is-link', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Cell onClick={onClick}>我是Cell</Cell>);
    wrapper.find(TouchableHighlight).props().onPress();
    expect(onClick).toBeCalled();
  });
});
