import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Checkbox from '../index';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Checkbox checked onChange={jest.fn()}>
        foo
      </Checkbox>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const wrapper = render(<Checkbox defaultChecked>foo</Checkbox>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = render(<Checkbox disabled>foo</Checkbox>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('checked change false', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Checkbox onChange={onChange}>foo</Checkbox>);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toBeCalledWith({ target: { checked: true } });
  });

  it('receive new checked', () => {
    const wrapper = shallow(<Checkbox>foo</Checkbox>);
    wrapper.setProps({ checked: true });
  });
});

describe('Checkbox.Group', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Checkbox.Group>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1" checked>
          选项二
        </Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render value correctly', () => {
    const wrapper = render(
      <Checkbox.Group value={['0']}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render defaultValue correctly', () => {
    const wrapper = render(
      <Checkbox.Group defaultValue={['1']}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is button', () => {
    const wrapper = render(
      <Checkbox.Group type="button">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is list', () => {
    const wrapper = render(
      <Checkbox.Group type="list">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new value', () => {
    const wrapper = shallow(
      <Checkbox.Group>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    wrapper.setProps({ value: ['0'] });
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Checkbox.Group type="list" onChange={onChange}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2" disabled>
          选项三
        </Checkbox>
      </Checkbox.Group>,
    );
    const firstCheckbox = () =>
      wrapper.find(Checkbox).first().dive().dive().find('input[type="checkbox"]').first();
    firstCheckbox().simulate('change', { target: { checked: true } });
    expect(onChange).toBeCalledWith(['0']);
    firstCheckbox().simulate('change', { target: { checked: false } });
    expect(onChange).toBeCalledWith([]);

    // 测试disabled
    const lastCheckbox = wrapper
      .find(Checkbox)
      .last()
      .dive()
      .dive()
      .find('input[type="checkbox"]')
      .first();
    lastCheckbox.simulate('change', { target: { checked: true } });
    expect(onChange).toBeCalledWith([]);
  });
});
