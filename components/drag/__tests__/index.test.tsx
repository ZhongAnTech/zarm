/* eslint-disable dot-notation */
import React from 'react';
import { render, mount } from 'enzyme';
import type { TouchEvent, MouseEvent } from 'react';
import toJson from 'enzyme-to-json';
import Events from '../../utils/events';
import Drag from '../index';

function createPageXY(x, y) {
  return { pageX: x, pageY: y };
}

function createStartTouchEventObject({ x = 0, y = 0 }) {
  return ({ touches: [createPageXY(x, y)] } as unknown) as TouchEvent;
}

describe('Drag', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('snapshot', () => {
    it('renders correctly', () => {
      const props = {
        onDragStart: jest.fn(),
        onDragMove: jest.fn(),
        onDragEnd: jest.fn(),
      };
      const wrapper = render(
        <Drag {...props}>
          <div />
        </Drag>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('should handle touch start event triggered by touch', () => {
    const DateSpy = jest.spyOn(global, 'Date');
    const props = {
      onDragStart: jest.fn(),
    };
    const wrapper = mount(
      <Drag {...props}>
        <div />
      </Drag>,
    );
    const mEvent = createStartTouchEventObject({ x: 100, y: 0 });
    wrapper.find('div').invoke('onTouchStart')!(mEvent);
    expect(props.onDragStart).toBeCalledWith(mEvent, {
      startX: 100,
      startY: 0,
      startTime: DateSpy.mock.instances[0],
    });
  });

  it('should handle touch start event triggered by mouse', () => {
    const eventsOnSpy = jest.spyOn(Events, 'on');
    const DateSpy = jest.spyOn(global, 'Date');
    const props = {
      onDragStart: jest.fn(),
    };
    const wrapper = mount(
      <Drag {...props}>
        <div />
      </Drag>,
    );
    const mEvent = ({ clientX: 100, clientY: 50 } as unknown) as MouseEvent;
    wrapper.find('div').invoke('onMouseDown')!(mEvent);
    expect(props.onDragStart).toBeCalledWith(mEvent, {
      startX: 100,
      startY: 50,
      startTime: DateSpy.mock.instances[0],
    });
    expect(eventsOnSpy).toBeCalledWith(document.body, 'mousemove', expect.any(Function));
    expect(eventsOnSpy).toBeCalledWith(document.body, 'mouseup', expect.any(Function));
  });

  it('should handle touch move event triggerd by touch', () => {
    const mOnDragMove = jest.fn();
    const DateSpy = jest.spyOn(global, 'Date');
    const wrapper = mount(
      <Drag onDragMove={mOnDragMove}>
        <div />
      </Drag>,
    );
    const mTouchStartEvent = createStartTouchEventObject({ x: 0, y: 9 });
    const mTouchMoveEvent = ({ touches: [{ pageX: 100, pageY: 99 }] } as unknown) as TouchEvent;
    const divWrapper = wrapper.find('div');
    divWrapper.invoke('onTouchStart')!(mTouchStartEvent);
    divWrapper.invoke('onTouchMove')!(mTouchMoveEvent);
    expect(mOnDragMove).toBeCalledWith(mTouchMoveEvent, {
      startX: 0,
      startY: 9,
      offsetX: 100,
      offsetY: 90,
      startTime: DateSpy.mock.instances[0],
    });
  });

  it('should handle touch move event triggerd by mouse', () => {
    const mOnDragMove = jest.fn();
    const DateSpy = jest.spyOn(global, 'Date');
    const wrapper = mount(
      <Drag onDragMove={mOnDragMove}>
        <div />
      </Drag>,
    );
    const mMouseDownEvent = ({ clientX: 100, clientY: 100 } as unknown) as MouseEvent;
    const mMouseMoveEvent = ({ clientX: 0, clientY: 50 } as unknown) as MouseEvent;
    const divWrapper = wrapper.find('div');
    divWrapper.invoke('onMouseDown')!(mMouseDownEvent);
    expect(wrapper.instance()['dragState']).toEqual({
      startX: 100,
      startY: 100,
      startTime: DateSpy.mock.instances[0],
    });
    divWrapper.invoke('onMouseMove')!(mMouseMoveEvent);
    expect(mOnDragMove).toBeCalledWith(mMouseMoveEvent, {
      startX: 100,
      startY: 100,
      offsetX: -100,
      offsetY: -50,
      startTime: DateSpy.mock.instances[0],
    });
    expect(wrapper.instance()['dragState']).toEqual({
      startX: 100,
      startY: 100,
      startTime: DateSpy.mock.instances[0],
    });
  });

  it('should set drag state if onDragMove handler does not exist', () => {
    const DateSpy = jest.spyOn(global, 'Date');
    const wrapper = mount(
      <Drag>
        <div />
      </Drag>,
    );

    const mMouseDownEvent = ({ clientX: 100, clientY: 100 } as unknown) as MouseEvent;
    const mMouseMoveEvent = ({ clientX: 0, clientY: 50 } as unknown) as MouseEvent;
    const divWrapper = wrapper.find('div');
    divWrapper.invoke('onMouseDown')!(mMouseDownEvent);
    expect(wrapper.instance()['dragState']).toEqual({
      startX: 100,
      startY: 100,
      startTime: DateSpy.mock.instances[0],
    });
    divWrapper.invoke('onMouseMove')!(mMouseMoveEvent);
    expect(wrapper.instance()['dragState']).toEqual({
      startX: 100,
      startY: 100,
      offsetX: -100,
      offsetY: -50,
      startTime: DateSpy.mock.instances[0],
    });
  });

  it('should handle touch end event triggered by touch', () => {
    const mOnDragEnd = jest.fn();
    const wrapper = mount(
      <Drag onDragEnd={mOnDragEnd}>
        <div />
      </Drag>,
    );
    const mTouchStartEvent = createStartTouchEventObject({ x: 100, y: 0 });
    const mTouchEndEvent = ({ touches: [] } as unknown) as TouchEvent;
    const divWrapper = wrapper.find('div');
    divWrapper.invoke('onTouchStart')!(mTouchStartEvent);
    // eslint-disable-next-line prefer-destructuring
    const dragState = wrapper.instance()['dragState'];
    divWrapper.invoke('onTouchEnd')!(mTouchEndEvent);
    expect(mOnDragEnd).toBeCalledWith(mTouchEndEvent, dragState);
  });

  it('should handle touch end event triggered by mouse', () => {
    const eventsOffSpy = jest.spyOn(Events, 'off');
    const mOnDragEnd = jest.fn();
    const wrapper = mount(
      <Drag onDragEnd={mOnDragEnd}>
        <div />
      </Drag>,
    );
    const mMouseStartEvent = ({ clientX: 100, clientY: 100 } as unknown) as MouseEvent;
    const mMouseEndEvent = ({ clientX: 0, clientY: 50 } as unknown) as MouseEvent;
    const divWrapper = wrapper.find('div');
    divWrapper.invoke('onMouseDown')!(mMouseStartEvent);
    // eslint-disable-next-line prefer-destructuring
    const dragState = wrapper.instance()['dragState'];
    divWrapper.invoke('onMouseUp')!(mMouseEndEvent);
    expect(mOnDragEnd).toBeCalledWith(mMouseEndEvent, dragState);
    expect(eventsOffSpy).toBeCalledWith(document.body, 'mousemove', expect.any(Function));
    expect(eventsOffSpy).toBeCalledWith(document.body, 'mouseup', expect.any(Function));
  });

  it('should not call onDragEnd event handler if it does not exist', () => {
    const DateSpy = jest.spyOn(global, 'Date');
    const wrapper = mount(
      <Drag>
        <div />
      </Drag>,
    );
    const mTouchStartEvent = createStartTouchEventObject({ x: 100, y: 0 });
    const mTouchEndEvent = ({ touches: [] } as unknown) as TouchEvent;
    const divWrapper = wrapper.find('div');
    divWrapper.invoke('onTouchStart')!(mTouchStartEvent);
    expect(wrapper.instance()['dragState']).toEqual({
      startX: 100,
      startY: 0,
      startTime: DateSpy.mock.instances[0],
    });
    divWrapper.invoke('onTouchEnd')!(mTouchEndEvent);
    expect(wrapper.instance()['dragState']).toEqual({});
  });
});
