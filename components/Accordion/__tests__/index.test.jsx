import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Accordion from '../index';

describe('Accordion', () => {
  const props = {};

  it('renders correctly', () => {
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with accordion mode', () => {
    props.multiple = false;
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with animated', () => {
    props.animated = true;
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with defaultActiveIndex', () => {
    props.defaultActiveIndex = [1];
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
        <Accordion.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with string defaultActiveIndex', () => {
    props.defaultActiveIndex = '1';
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
        <Accordion.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with number defaultActiveIndex', () => {
    props.defaultActiveIndex = 0;
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
        <Accordion.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with activeIndex', () => {
    props.activeIndex = [0];
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
        <Accordion.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with string activeIndex', () => {
    props.activeIndex = '1';
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
        <Accordion.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with number activeIndex', () => {
    props.activeIndex = 0;
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
        <Accordion.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with dynamic activeIndex', () => {
    props.activeIndex = [0];
    const wrapper = shallow(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
        <Accordion.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    wrapper.setProps({ activeIndex: '1' });

    expect(wrapper.state('activeIndex')).toEqual(['1']);
  });

  it('click accordion item correctly', () => {
    props.onChange = jest.fn();
    const wrapper = mount(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐" {...props}>
          <div>50元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    wrapper.find('.za-accordion-item-title').simulate('click');
    expect(props.onChange).toBeCalled();
  });

  it('renders correctly with open mode', () => {
    props.open = true;
    const wrapper = render(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
        <Accordion.Item title="100元套餐">
          <div>100元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('click accordion item correctly with open mode', () => {
    props.onChange = jest.fn();
    const wrapper = mount(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    wrapper.find('.za-accordion-item-title').simulate('click');
    expect(props.onChange).not.toBeCalled();
  });
});
