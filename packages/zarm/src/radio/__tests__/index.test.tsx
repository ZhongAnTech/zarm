import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Radio from '../index';
import type { RadioRef } from '../index';

const classPrefix = 'za-radio';

describe('Radio', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Radio checked onChange={jest.fn()}>
        foo
      </Radio>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const wrapper = render(<Radio defaultChecked>foo</Radio>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = render(<Radio disabled>foo</Radio>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('click event', () => {
    const { container } = render(<Radio>foo</Radio>);
    const input = container.querySelectorAll('input')[0];
    const radio = container.getElementsByTagName('label')[0];

    expect(input).not.toBeChecked();
    expect(radio).toHaveClass(`${classPrefix}`);

    fireEvent.click(radio);
    expect(input).toBeChecked();
    expect(radio).toHaveClass(`${classPrefix}--checked`);

    fireEvent.click(radio);
    expect(input).toBeChecked();
    expect(radio).toHaveClass(`${classPrefix}--checked`);
  });

  it('static method', () => {
    const ref = React.createRef<RadioRef>();

    let checked = false;
    const onChange = jest.fn(e => {
      checked = e.target.checked;
    });

    const { container } = render(<Radio ref={ref} onChange={onChange}>foo</Radio>);
    const input = container.querySelectorAll('input')[0];
    ref.current?.check();
    expect(input).toBeChecked();
    expect(onChange).toHaveBeenCalled();
    expect(checked).toEqual(true);

    // todo...
    // ref.current?.uncheck();
    // expect(input).not.toBeChecked();
    // expect(onChange).toHaveBeenCalled();
    // expect(checked).toEqual(false);
  });
});

describe('Radio.Group', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Radio.Group>
        <Radio value="0">选项一</Radio>
        <Radio value="1">
          选项二
        </Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('render value correctly', () => {
    const wrapper = render(
      <Radio.Group value="0">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('render defaultValue correctly', () => {
    const wrapper = render(
      <Radio.Group defaultValue="1">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('type is button', () => {
    const wrapper = render(
      <Radio.Group type="button">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    expect(wrapper.asFragment()).toMatchSnapshot();

    const { container } = wrapper;
    const radio = container.getElementsByTagName('label')[0];
    fireEvent.click(radio);
    expect(radio).toHaveClass(`${classPrefix}--checked`);
  });

  it('type is list', () => {
    const wrapper = render(
      <Radio.Group type="list">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('receive new value', () => {
    const { container } = render(
      <Radio.Group defaultValue="0">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    const items = Array.from(container.querySelectorAll('input'));
    expect(items[0].checked).toEqual(true);
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Radio.Group type="list" onChange={onChange}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>
          选项三
        </Radio>
      </Radio.Group>,
    );
    const items = container.querySelectorAll('.za-radio');
    fireEvent.click(items[0]);
    expect(onChange).toBeCalledWith('0');

    fireEvent.click(items[0]);
    expect(onChange).toBeCalledWith('0');

    // 测试disabled
    fireEvent.click(items[2]);
    expect(onChange).toBeCalledWith('0');
  });
});
