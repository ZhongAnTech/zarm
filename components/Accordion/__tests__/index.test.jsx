import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Accordion from '../index';

describe('Accordion', () => {
  const props = {
    accordion: true,
  };

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

  it('renders correctly with dynamic activeIndex', () => {
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

    return Promise.resolve([1]).then((active) => {
      props.activeIndex = active;
      const wrapperDynamic = render(
        <Accordion {...props}>
          <Accordion.Item title="50元套餐">
            <div>50元套餐内容</div>
          </Accordion.Item>
          <Accordion.Item title="100元套餐">
            <div>100元套餐内容</div>
          </Accordion.Item>
        </Accordion>
      );
      expect(toJson(wrapperDynamic)).toMatchSnapshot();
    });
  });

  it('click accordion item correctly', () => {
    props.onChange = jest.fn();
    const wrapper = mount(
      <Accordion {...props}>
        <Accordion.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Accordion.Item>
      </Accordion>
    );
    wrapper.find('.za-accordion-item-title').simulate('click');
    expect(props.onChange).toBeCalled();
  });
});
