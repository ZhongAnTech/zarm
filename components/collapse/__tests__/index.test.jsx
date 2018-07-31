import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Collapse from '../index';

describe('Collapse', () => {
  const props = {};

  it('renders correctly', () => {
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with collapse mode', () => {
    props.multiple = false;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with animated', () => {
    props.animated = true;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with defaultActiveIndex', () => {
    props.defaultActiveIndex = [1];
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with string defaultActiveIndex', () => {
    props.defaultActiveIndex = '1';
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with number defaultActiveIndex', () => {
    props.defaultActiveIndex = 0;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with activeIndex', () => {
    props.activeIndex = [0];
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with string activeIndex', () => {
    props.activeIndex = '1';
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with number activeIndex', () => {
    props.activeIndex = 0;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with dynamic activeIndex', () => {
    props.activeIndex = [0];
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.setProps({ activeIndex: '1' });

    expect(wrapper.state('activeIndex')).toEqual(['1']);
  });

  it('click collapse item correctly', () => {
    props.onChange = jest.fn();
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐" {...props}>
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.find('.za-collapse-item-title').simulate('click');
    expect(props.onChange).toBeCalled();
  });

  it('renders correctly with open mode', () => {
    props.open = true;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('click collapse item correctly with open mode', () => {
    props.onChange = jest.fn();
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.find('.za-collapse-item-title').simulate('click');
    expect(props.onChange).not.toBeCalled();
  });
});
