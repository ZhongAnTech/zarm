import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Checkbox from '../index';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Checkbox checked onChange={jest.fn()}>
        foo
      </Checkbox>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const wrapper = render(<Checkbox defaultChecked>foo</Checkbox>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = render(<Checkbox disabled>foo</Checkbox>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('checked change false', () => {
    const onChange = jest.fn();
    const { container } = render(<Checkbox onChange={onChange}>foo</Checkbox>);
    fireEvent.click(container.querySelectorAll('input')[0]);
    expect(onChange).toHaveBeenCalledTimes(1);
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
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('render value correctly', () => {
    const wrapper = render(
      <Checkbox.Group value={['0']}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('render defaultValue correctly', () => {
    const wrapper = render(
      <Checkbox.Group defaultValue={['1']}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('type is button', () => {
    const wrapper = render(
      <Checkbox.Group type="button">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('type is list', () => {
    const wrapper = render(
      <Checkbox.Group type="list">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('receive new value', () => {
    const { container } = render(
      <Checkbox.Group defaultValue={['0']}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>,
    );
    const items = Array.from(container.querySelectorAll('input'));
    expect(items[0].checked).toEqual(true);
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox.Group type="list" onChange={onChange}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2" disabled>
          选项三
        </Checkbox>
      </Checkbox.Group>,
    );
    const items = container.querySelectorAll('input');
    fireEvent.click(items[0], { target: { checked: true } });

    expect(onChange).toBeCalledWith(['0']);
    fireEvent.click(items[0], { target: { checked: false } });
    expect(onChange).toBeCalledWith([]);

    // 测试disabled
    fireEvent.click(items[2], { target: { checked: true } });
    expect(onChange).toBeCalledWith([]);
  });
});
