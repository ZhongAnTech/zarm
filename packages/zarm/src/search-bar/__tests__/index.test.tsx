/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchBar from '../index';
// import SearchBarOriginal from '../SearchBar';

describe('SearchBar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = render(
        <SearchBar shape="round" cancelText="搜索" placeholder="请输入关键字" />,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders defaultValue correctly', () => {
      const wrapper = mount(
        <SearchBar shape="round" cancelText="搜索" placeholder="请输入关键字" />,
      );
      wrapper.setProps({ defaultValue: '搜索关键字' });
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

  // it('should update derived state if props.value changed', () => {
  //   const wrapper = shallow(<SearchBarOriginal value="a" />);
  //   expect(wrapper.state()).toEqual({
  //     focus: false,
  //     value: 'a',
  //     preValue: 'a',
  //     isOnComposition: false,
  //   });
  //   wrapper.setProps({ value: 'b' });
  //   expect(wrapper.state()).toEqual({
  //     focus: false,
  //     value: 'b',
  //     preValue: 'b',
  //     isOnComposition: false,
  //   });
  // });

  // it('should not update state if props.value is not changed', () => {
  //   const wrapper = shallow(<SearchBarOriginal value="a" />);
  //   expect(wrapper.state()).toEqual({
  //     focus: false,
  //     value: 'a',
  //     preValue: 'a',
  //     isOnComposition: false,
  //   });
  //   wrapper.setProps({ showCancel: true });
  //   expect(wrapper.state()).toEqual({
  //     focus: false,
  //     value: 'a',
  //     preValue: 'a',
  //     isOnComposition: false,
  //   });
  // });

  // it('should calculate the position of cancel ref if props.showCancel is false', () => {
  //   const getComputedStyleSpy = jest
  //     .spyOn(window, 'getComputedStyle')
  //     .mockReturnValueOnce(({ 'margin-left': '10px' } as unknown) as CSSStyleDeclaration);
  //   const cancelRefSymbol = Symbol('cancelRef');
  //   Object.defineProperty(SearchBarOriginal.prototype, 'cancelRef', {
  //     get() {
  //       return this[cancelRefSymbol];
  //     },
  //     set(ref: HTMLDivElement) {
  //       if (ref) {
  //         jest
  //           .spyOn(ref, 'getBoundingClientRect')
  //           .mockReturnValueOnce(({ width: 20 } as unknown) as DOMRect);
  //       }
  //       this[cancelRefSymbol] = ref;
  //     },
  //     configurable: true,
  //   });

  //   const wrapper = mount(<SearchBarOriginal showCancel={false} />);
  //   const cancelRef = wrapper.instance()['cancelRef'] as HTMLDivElement;
  //   expect(getComputedStyleSpy).toBeCalledWith(cancelRef, '');
  //   expect(cancelRef.style.marginRight).toEqual('-30px');
  // });

  // it('should calculate the position of cancel ref if props.showCancel is true', () => {
  //   const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');
  //   const wrapper = mount(<SearchBarOriginal showCancel />);
  //   const cancelRef = wrapper.instance()['cancelRef'] as HTMLDivElement;
  //   expect(getComputedStyleSpy).not.toBeCalled();
  //   expect(cancelRef.style.marginRight).toEqual('0px');
  // });

  // it('should handle focus animation', () => {
  //   const wrapper = mount(<SearchBarOriginal showCancel value="a" />);
  //   const cancelRef = wrapper.instance()['cancelRef'] as HTMLDivElement;
  //   expect(cancelRef.style.marginRight).toEqual('0px');
  //   expect(cancelRef.className).toContain('animation-ease');
  // });

  // it('should handle focus event', () => {
  //   const mOnFocus = jest.fn();
  //   const wrapper = mount(<SearchBarOriginal onFocus={mOnFocus} />);
  //   expect(wrapper.state('focus')).toBeFalsy();
  //   wrapper.find('input').simulate('focus');
  //   expect(wrapper.state('focus')).toBeTruthy();
  //   expect(mOnFocus).toBeCalledTimes(1);
  //   expect((wrapper.instance()['cancelRef'] as HTMLDivElement).className).toContain(
  //     'animation-ease',
  //   );
  // });

  // it('should handle input change event and call props.onChange()', () => {
  //   const mOnChange = jest.fn();
  //   const wrapper = mount(<SearchBarOriginal onChange={mOnChange} />);
  //   const mEvent = { target: { value: 'test' } };
  //   wrapper.find('input').simulate('change', mEvent);
  //   expect(mOnChange).toBeCalledWith('test');
  // });

  // it('should handle input change event but not call props.onChange() if composition start event happens', () => {
  //   const mOnChange = jest.fn();
  //   const wrapper = mount(<SearchBarOriginal onChange={mOnChange} />);
  //   const mEvent = { target: { value: 'test' } };
  //   const inputWrapper = wrapper.find('input');
  //   inputWrapper.simulate('compositionstart').simulate('change', mEvent);
  //   expect(wrapper.state('value')).toEqual('test');
  //   expect(mOnChange).not.toBeCalled();
  // });

  // it('should handle composition end event and call props.onChange()', () => {
  //   const mOnChange = jest.fn();
  //   const wrapper = mount(<SearchBarOriginal onChange={mOnChange} />);
  //   const mEvent = { target: { value: 'test' }, type: 'compositionend' };
  //   const inputWrapper = wrapper.find('input');
  //   inputWrapper.simulate('compositionend', mEvent);
  //   expect(mOnChange).toBeCalledWith('test');
  // });

  // it('should re-calculate the position of cancel ref if props.locale.cancelText is changed', () => {
  //   const calculatePositonSpy = jest.spyOn(SearchBarOriginal.prototype, 'calculatePositon');
  //   const wrapper = mount(<SearchBarOriginal locale={{ cancelText: '搜索', placeholder: '' }} />);
  //   expect(calculatePositonSpy).toBeCalledWith(
  //     expect.objectContaining({
  //       locale: { cancelText: '搜索', placeholder: '' },
  //     }),
  //   );
  //   wrapper.setProps({ locale: { cancelText: 'cancel', placeholder: '' } });
  //   expect(calculatePositonSpy).toBeCalledWith(
  //     expect.objectContaining({
  //       locale: { cancelText: 'cancel', placeholder: '' },
  //     }),
  //   );
  // });

  // it('should handle form submit event', () => {
  //   const mOnSubmit = jest.fn();
  //   const wrapper = mount(<SearchBarOriginal value="test" onSubmit={mOnSubmit} />);
  //   const inputRef = wrapper.instance()['inputRef'] as HTMLInputElement;
  //   const blurSpy = jest.spyOn(inputRef, 'blur');
  //   const mEvent = { preventDefault: jest.fn() };
  //   wrapper.find('form').simulate('submit', mEvent);
  //   expect(mEvent.preventDefault).toBeCalledTimes(1);
  //   expect(blurSpy).toBeCalledTimes(1);
  //   expect(mOnSubmit).toBeCalledWith('test');
  // });

  // it('should handle composition update event', () => {
  //   const handleCompositionSpy = jest.spyOn(SearchBarOriginal.prototype, 'handleComposition');
  //   const wrapper = mount(<SearchBarOriginal />);
  //   wrapper.find('input').simulate('compositionupdate');
  //   expect(handleCompositionSpy).toBeCalledTimes(1);
  //   expect(handleCompositionSpy).toBeCalledWith(
  //     expect.objectContaining({
  //       type: 'compositionupdate',
  //     }),
  //   );
  // });
});
