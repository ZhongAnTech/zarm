import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ClickOutside from '../index';
import Events from '../../utils/events';

describe('ClickOutside', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('renders correctly', () => {
    const wrapper = render(
      <ClickOutside onClickOutside={() => {}}>
        <div>test</div>
      </ClickOutside>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // https://reactjs.org/warnings/unknown-prop.html
  it('should pass standard HTML attributes to root node', () => {
    const wrapper = mount(<ClickOutside id="test" />);
    expect(wrapper.getDOMNode().id).toEqual('test');
  });

  it('should not call action on click outside the component when disabled', () => {
    const onClickOutside = jest.fn();
    const clickEvent = new MouseEvent('click', { bubbles: true });

    const wrapper = mount(
      <ClickOutside disabled onClickOutside={onClickOutside}>
        <div id="test">test disabled</div>
      </ClickOutside>,
    );
    wrapper.find('#test').getDOMNode().dispatchEvent(clickEvent);
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should bind click and touchend event handler on document when component did mount', () => {
    const eventsOnSpy = jest.spyOn(Events, 'on').mockImplementation();
    shallow(<ClickOutside />);
    expect(eventsOnSpy).toBeCalledWith(document, 'click', expect.any(Function));
    expect(eventsOnSpy).toBeCalledWith(document, 'touchend', expect.any(Function));
    expect(eventsOnSpy).toBeCalledTimes(2);
  });

  it('should unbind event handler from document when disabled and component did update', () => {
    const eventsOnSpy = jest.spyOn(Events, 'on').mockImplementation();
    const eventsOffSpy = jest.spyOn(Events, 'off').mockImplementation();
    const wrapper = shallow(<ClickOutside />);
    expect(eventsOnSpy).toBeCalledWith(document, 'click', expect.any(Function));
    expect(eventsOnSpy).toBeCalledWith(document, 'touchend', expect.any(Function));
    expect(eventsOnSpy).toBeCalledTimes(2);
    wrapper.setProps({ disabled: true });
    expect(eventsOffSpy).toBeCalledWith(document, 'click', expect.any(Function));
    expect(eventsOffSpy).toBeCalledWith(document, 'touchend', expect.any(Function));
    expect(eventsOffSpy).toBeCalledTimes(2);
  });

  it('should bind event handler when enabled and component did update', () => {
    const eventsOnSpy = jest.spyOn(Events, 'on').mockImplementation();
    const wrapper = shallow(<ClickOutside disabled />);
    expect(eventsOnSpy).not.toBeCalled();
    wrapper.setProps({ disabled: false });
    expect(eventsOnSpy).toBeCalledWith(document, 'click', expect.any(Function));
    expect(eventsOnSpy).toBeCalledWith(document, 'touchend', expect.any(Function));
    expect(eventsOnSpy).toBeCalledTimes(2);
  });

  it('should unbind event handler when component will unmount', () => {
    const eventsOffSpy = jest.spyOn(Events, 'off').mockImplementation();
    const wrapper = shallow(<ClickOutside />);
    wrapper.unmount();
    expect(eventsOffSpy).toBeCalledWith(document, 'click', expect.any(Function));
    expect(eventsOffSpy).toBeCalledWith(document, 'touchend', expect.any(Function));
    expect(eventsOffSpy).toBeCalledTimes(2);
  });

  it('should not call action when user click if isTouch is true', () => {
    const mOnClickOutside = jest.fn();
    const touchEndEvent = new TouchEvent('touchend');
    const clickEvent = new MouseEvent('click');
    shallow(<ClickOutside onClickOutside={mOnClickOutside} />);
    document.dispatchEvent(touchEndEvent);
    document.dispatchEvent(clickEvent);
    expect(mOnClickOutside).not.toBeCalled();
  });

  it('should not call action on click inside the component', () => {
    const mOnClickOutside = jest.fn();
    const outerNode = document.createElement('div');
    document.body.appendChild(outerNode);
    const wrapper = mount(
      <ClickOutside onClickOutside={mOnClickOutside}>
        <div id="test">test</div>
      </ClickOutside>,
      { attachTo: outerNode },
    );

    const clickEvent = new MouseEvent('click', { bubbles: true });
    wrapper.find('#test').getDOMNode().dispatchEvent(clickEvent);
    expect(mOnClickOutside).not.toBeCalled();
  });

  // it.todo('should not call action if the event target in the ignored node list')
});
