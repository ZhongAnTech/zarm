import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchBar from '../index';

describe('SearchBar', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <SearchBar
        shape="round"
        cancelText="取消"
        placeholder="搜索"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders defaultValue correctly', () => {
    const wrapper = mount(
      <SearchBar
        shape="round"
        cancelText="取消取消"
        placeholder="搜索"
      />
    );
    wrapper.setProps({ defaultValue: '搜索关键字' });
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const wrapper = mount(
      <SearchBar
        shape="round"
        placeholder="搜索"
        onFocus={onFocus}
      />
    );
    wrapper.find('input[type="search"]').simulate('focus');
    expect(onFocus).toBeCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders onChange called correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SearchBar
        shape="round"
        placeholder="搜索"
        onChange={onChange}
      />
    );

    const input = wrapper.find('input[type="search"]');
    input.simulate('change', { target: { value: '测试值' } });
    expect(input.instance().value).toEqual('测试值');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders maxLength correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SearchBar
        shape="round"
        placeholder="搜索"
        onChange={onChange}
        maxLength={5}
      />
    );

    const input = wrapper.find('input[type="search"]');
    input.simulate('change', { target: { value: '12345678910' } });
    expect(input.instance().value).toEqual('12345');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onBlur called correctly', () => {
    const onBlur = jest.fn();
    const wrapper = mount(
      <SearchBar
        shape="round"
        placeholder="搜索"
        onBlur={onBlur}
      />
    );

    const input = wrapper.find('input[type="search"]');
    const spyOnBlur = jest.spyOn(wrapper.instance(), 'onBlur');
    input.simulate('blur');
    expect(spyOnBlur).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onClear called correctly', () => {
    const onClear = jest.fn();
    const wrapper = mount(
      <SearchBar
        shape="round"
        placeholder="搜索"
        onClear={onClear}
      />
    );

    const input = wrapper.find('input[type="search"]');
    input.simulate('change', { target: { value: 'My new value' } });
    wrapper.find('i.za-searchbar-clear').simulate('click');
    expect(onClear).toHaveBeenCalled();
    expect(input.instance().value).toEqual('');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onCancel called correctly', () => {
    const onCancel = jest.fn();
    const wrapper = mount(
      <SearchBar
        shape="round"
        placeholder="搜索"
        onCancel={onCancel}
      />
    );
    const input = wrapper.find('input[type="search"]');
    input.simulate('focus');
    wrapper.find('.za-searchbar-cancel').simulate('click');
    expect(onCancel).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onSubmit called correctly', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(
      <SearchBar
        shape="round"
        placeholder="搜索"
        onSubmit={onSubmit}
      />
    );

    const input = wrapper.find('input[type="search"]');
    input.simulate('change', { target: { value: 'My new value' } });
    wrapper.find('.za-searchbar-form').simulate('submit');
    expect(onSubmit).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
