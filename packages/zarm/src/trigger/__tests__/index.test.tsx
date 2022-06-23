import { render } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import Trigger from '../Trigger';

describe('Trigger', () => {
  afterEach(() => {
    // Trigger.instanceList = [];
    // Trigger.count = 0;
    jest.restoreAllMocks();
  });
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = render(<Trigger />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    // it('renders onFocus called correctly', () => {
    //   const onFocus = jest.fn();
    //   const wrapper = mount(<SearchBar shape="round" placeholder="请输入关键字" onFocus={onFocus} />);
    //   wrapper.find('input[type="search"]').simulate('focus');
    //   expect(onFocus).toBeCalled();
    //   expect(toJson(wrapper)).toMatchSnapshot();
    // });

    // it('renders onChange called correctly', () => {
    //   const onChange = jest.fn();
    //   const wrapper = mount(<SearchBar shape="round" placeholder="请输入关键字" onChange={onChange} />);
    //   const input = wrapper.find('input[type="search"]');
    //   input.simulate('change', { target: { value: '测试值' } });
    //   expect(input.instance()['value']).toEqual('测试值');
    //   expect(toJson(wrapper)).toMatchSnapshot();
    // });

    // it('renders onCancel called correctly', () => {
    //   const onCancel = jest.fn();
    //   const wrapper = mount(<SearchBar shape="round" placeholder="请输入关键字" onCancel={onCancel} />);
    //   const input = wrapper.find('input[type="search"]');
    //   input.simulate('focus');
    //   wrapper.find('.za-search-bar__cancel').simulate('click');
    //   expect(onCancel).toHaveBeenCalled();
    //   expect(toJson(wrapper)).toMatchSnapshot();
    // });

    // it('renders onSubmit called correctly', () => {
    //   const onSubmit = jest.fn();
    //   const wrapper = mount(<SearchBar shape="round" placeholder="请输入关键字" onSubmit={onSubmit} />);
    //   const input = wrapper.find('input[type="search"]');
    //   input.simulate('change', { target: { value: 'My new value' } });
    //   wrapper.find('.za-search-bar__form').simulate('submit');
    //   expect(onSubmit).toHaveBeenCalled();
    //   expect(toJson(wrapper)).toMatchSnapshot();
    // });

    // it('renders onClear called correctly', () => {
    //   const onChange = jest.fn();
    //   const wrapper = mount(<SearchBar onChange={onChange} />);
    //   const input = wrapper.find('input[type="search"]');
    //   input.simulate('change', { target: { value: 'My new value' } });
    //   wrapper.find('i.za-input__clear').simulate('click');
    //   expect(onChange).toHaveBeenCalled();
    //   expect(input.instance()['value']).toEqual('');
    //   expect(toJson(wrapper)).toMatchSnapshot();
    // });
  });
  // describe('static getDerivedStateFromProps', () => {
  //   it('should return null if visible prop is false and instance list of Trigger component is empty', () => {
  //     const props: PropsType = {
  //       disabled: false,
  //       visible: true,
  //     };
  //     const actual = Trigger.getDerivedStateFromProps(props);
  //     expect(actual).toBeNull();
  //     expect(Trigger.instanceList).toEqual([]);
  //   });
  //   it('should push onclose function to instance list if visible is true and the onclose function does not exist in instance list', () => {
  //     const props: PropsType = {
  //       disabled: false,
  //       visible: true,
  //       onClose: jest.fn(),
  //     };
  //     const actual = Trigger.getDerivedStateFromProps(props);
  //     expect(actual).toBeNull();
  //     expect(Trigger.instanceList).toEqual([props.onClose]);
  //   });
  // });

  // describe('static onKeydown', () => {
  //   it('should handle escape keyboard event using the last handler of instance list', () => {
  //     const mHandler = jest.fn();
  //     // eslint-disable-next-line dot-notation
  //     mHandler['disabled'] = false;
  //     Trigger.instanceList = [mHandler];
  //     const mEvent = ({ keyCode: 27 } as unknown) as KeyboardEvent;
  //     Trigger.onKeydown(mEvent);
  //     expect(mHandler).toBeCalledTimes(1);
  //   });

  //   it('should do nothing if the instance list is empty', () => {
  //     const mEvent = ({ keyCode: 27 } as unknown) as KeyboardEvent;
  //     expect(Trigger.onKeydown(mEvent)).toBeUndefined();
  //   });

  //   it('should do nothing if last handler is disabled', () => {
  //     const mHandler = jest.fn();
  //     // eslint-disable-next-line dot-notation
  //     mHandler['disabled'] = true;
  //     Trigger.instanceList = [mHandler];
  //     const mEvent = ({ keyCode: 27 } as unknown) as KeyboardEvent;
  //     Trigger.onKeydown(mEvent);
  //     expect(mHandler).not.toBeCalled();
  //   });
  // });

  // it('should add keydown event listener for document.body and increase the counter', () => {
  //   const addEventListenerSpy = jest.spyOn(document.body, 'addEventListener');
  //   shallow(<Trigger visible disabled={false} />);
  //   shallow(<Trigger visible disabled={false} />);
  //   expect(addEventListenerSpy).toBeCalledWith('keydown', Trigger.onKeydown);
  //   expect(addEventListenerSpy).toBeCalledTimes(1);
  //   expect(Trigger.count).toBe(2);
  // });

  // it('should remove keydown event handler from document.body and instance list', () => {
  //   const removeEventListenerSpy = jest.spyOn(document.body, 'removeEventListener');
  //   const mOnClose = jest.fn();
  //   const wrapper = shallow(<Trigger visible disabled={false} onClose={mOnClose} />);
  //   expect(Trigger.instanceList).toEqual([mOnClose]);
  //   expect(Trigger.count).toBe(1);
  //   wrapper.unmount();
  //   expect(Trigger.instanceList).toHaveLength(0);
  //   expect(Trigger.count).toBe(0);
  //   expect(removeEventListenerSpy).toBeCalledWith('keydown', Trigger.onKeydown);
  //   expect(removeEventListenerSpy).toBeCalledTimes(1);
  // });
});
