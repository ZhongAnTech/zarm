import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Slider from '../index';

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

describe('Slider', () => {
  const marks = {
    0: '0',
    26: '26',
    60: '60',
    100: '100',
  };

  it('shallows correctly', () => {
    const wrapper = shallow(<Slider />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('min', () => {
    const wrapper = shallow(<Slider min={0} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('max', () => {
    const wrapper = shallow(<Slider max={100} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('step', () => {
    const wrapper = shallow(<Slider step={5} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = shallow(<Slider disabled />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultValue', () => {
    const wrapper = shallow(<Slider defaultValue={10} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('value', () => {
    const wrapper = shallow(<Slider value={10} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('showMark', () => {
    const wrapper = shallow(<Slider showMark marks={marks} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('marks', () => {
    const wrapper = shallow(<Slider marks={marks} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('marks error', () => {
    const wrapper = shallow(<Slider showMark />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('vertical', () => {
    const wrapper = shallow(<Slider vertical />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('set new value', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Slider />);
    wrapper.setProps({ value: 50 });
    jest.runAllTimers();
    wrapper.unmount();
  });

  // it('touch event', () => {
  //   const onChange = jest.fn();
  //   const wrapper = mount(<Slider min={0} max={100} step={5} onChange={onChange} />).find('.za-slider-handle');
  //   wrapper.simulate('touchStart', {
  //     touches: [10, 0],
  //   });
  //   wrapper.simulate('touchMove', {
  //     touches: [100, 0],
  //   });
  //   wrapper.simulate('touchEnd', {
  //     touches: [300, 0],
  //   });

  //   // expect(onChange).toBeCalled();
  // });

  it('touch event', () => {
    const wrapper = mount(<Slider disabled />).find('.za-slider__handle');
    wrapper.simulate('touchStart', {
      touches: [10, 0],
    });
    wrapper.simulate('touchMove', {
      touches: [100, 0],
    });
    wrapper.simulate('touchEnd', {
      touches: [200, 0],
    });
  });

  it('mouse event', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Slider onChange={onChange} />).find('.za-slider__handle');
    wrapper.simulate('mouseDown', {
      clientX: 0,
      clientY: 0,
    });
    wrapper.simulate('mouseMove', {
      clientX: 10,
      clientY: 0,
    });
    wrapper.simulate('mouseUp', {
      clientX: 30,
      clientY: 0,
    });

    expect(onChange).toBeCalled();
  });

  it('vertical mouse event', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Slider onChange={onChange} step={5.5} vertical />).find('.za-slider__handle');
    wrapper.simulate('mouseDown', {
      clientX: 0,
      clientY: 0,
    });
    wrapper.simulate('mouseMove', {
      clientX: 0,
      clientY: -10,
    });
    wrapper.simulate('mouseUp', {
      clientX: 0,
      clientY: -20,
    });

    expect(onChange).toBeCalled();
  });
});
