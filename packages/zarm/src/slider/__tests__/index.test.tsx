/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable dot-notation */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
// import type { TouchEvent } from 'react';
import Slider from '../index';
// import ToolTip from '../../tooltip';

// import Events from '../../utils/events';

// import { NonFunctionPropertyNames } from '../../utils/utilityTypes';

// function mockLineRef(
//   componentClass,
//   prop: Exclude<NonFunctionPropertyNames<HTMLDivElement>, undefined>,
//   value: any,
// ) {
//   const lineRefKey = Symbol('line');
//   Object.defineProperty(componentClass, 'line', {
//     get() {
//       return this[lineRefKey];
//     },
//     set(ref) {
//       if (ref) {
//         Object.defineProperty(ref, prop, {
//           value,
//           configurable: true,
//         });
//         this[lineRefKey] = ref;
//       }
//       this[lineRefKey] = ref;
//     },
//     configurable: true,
//   });
// }

// const mockGetBoundingClientRect = (width) => {
//   const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

//   Element.prototype.getBoundingClientRect = () => {
//     return {
//       bottom: 0,
//       height: 100,
//       left: 0,
//       right: 0,
//       top: 0,
//       width,
//       x: 0,
//       y: 0,
//       toJSON: jest.fn,
//     };
//   };

//   return () => {
//     Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
//   };
// };

describe('Slider', () => {
  const marks = {
    0: '0',
    26: '26',
    60: '60',
    100: '100',
  };

  describe('snapshot', () => {
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
      const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
      const wrapper = shallow(<Slider showMark />);
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
    });

    it('vertical', () => {
      const wrapper = shallow(<Slider vertical />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('vertical and marks', () => {
      const wrapper = shallow(<Slider vertical showMark marks={marks} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('should ', () => {});

  it('should not render mark info if marks is an empty object and props.showMark is true', () => {
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
    const wrapper = mount(<Slider showMark marks={{}} />);
    expect(wrapper.find('.za-slider__marks').exists()).toBeFalsy();
    expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
  });

  it('should not render mark info if marks is NOT an object and props.showMark is true', () => {
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
    const wrapper = mount(<Slider showMark marks={null as any} />);
    expect(wrapper.find('.za-slider__marks').exists()).toBeFalsy();
    expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
  });

  it('should render mark info with custom marks', () => {
    const MARKS = {
      0: '0°C',
      26: '26°C',
      65: '65°C',
      100: '100°C',
    };
    const wrapper = mount(<Slider showMark marks={MARKS} value={55} />);
    expect(wrapper.find('.za-slider__mark')).toHaveLength(4);
    expect(wrapper.find('.za-slider__mark').map((mark) => mark.text())).toEqual(
      expect.arrayContaining(['100°C', '0°C', '26°C', '65°C']),
    );
    expect(
      wrapper.find('.za-slider__mark').map((mark) => {
        const style = mark.prop('style');
        return style ? style.left : '';
      }),
    ).toEqual(expect.arrayContaining(['0%', '26%', '65%', '100%']));
    expect(
      wrapper
        .find('.za-slider__line__dot')
        .map((dot) => dot.prop('className'))
        .filter((className) => {
          if (className) {
            return className.includes('za-slider__line__dot--active');
          }
          return false;
        }),
    ).toHaveLength(2);
  });

  it('mouse event', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <div data-testid="za-slider-el">
        <Slider onChange={onChange} style={{ width: 200 }} />
      </div>,
    );
    const wrapper = getByTestId('za-slider-el').getElementsByClassName('za-slider__handle');
    const element = [].slice.call(wrapper);
    fireEvent.mouseDown(element?.[0], { pointerId: 15, clientX: 10, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element?.[0], { pointerId: 15, clientX: 200, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(element?.[0], { pointerId: 15 });
    expect(onChange).toBeCalled();
  });
});
