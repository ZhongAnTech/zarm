import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Collapse from '../index';

describe('Collapse', () => {
  const props = {};

  it('renders correctly', () => {
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with collapse mode', () => {
    props.multiple = true;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
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
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with defaultActiveKey', () => {
    props.defaultActiveKey = [1];
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item key="1" title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with string defaultActiveKey', () => {
    props.defaultActiveKey = '1';
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item key="1" title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with number defaultActiveKey', () => {
    props.defaultActiveKey = 0;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item key="1" title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with activeKey', () => {
    props.activeKey = [0];
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item key="1" title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with string activeKey', () => {
    props.activeKey = '1';
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item key="1" title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with number activeKey', () => {
    props.activeKey = 0;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item key="1" title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with dynamic activeKey', () => {
    props.activeKey = [0];
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
        <Collapse.Item key="1" title="100元套餐">
          <div>100元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.setProps({ activeKey: '1' });

    expect(wrapper.state('activeKey')).toEqual(['1']);
  });

  it('click collapse item correctly', () => {
    props.onChange = jest.fn();
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐" {...props}>
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.find('.za-collapse-item-title').simulate('click');
    expect(props.onChange).toBeCalled();
  });

  it('click collapse item correctly with disabled mode', () => {
    props.onChange = jest.fn();
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item key="0" title="50元套餐" disabled>
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.find('.za-collapse-item-title').simulate('click');
    expect(props.onChange).not.toBeCalled();
  });
});
