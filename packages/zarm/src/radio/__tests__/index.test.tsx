import React, { ChangeEvent } from 'react';
import { render, fireEvent } from '@testing-library/react';
import RadioGroup from '../RadioGroup';
import Radio from '../index';

class TestRadio extends React.Component<{
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}> {
  render() {
    return <input {...this.props} />;
  }
}

describe('Radio', () => {
  it('renders correctly', () => {
    const { container } = render(<Radio value="0">选项一</Radio>);
    expect(container).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const { container } = render(
      <Radio defaultChecked value="0">
        选项一
      </Radio>,
    );
    expect(container).toMatchSnapshot();
  });

  it('type is button', () => {
    const { container } = render(
      <Radio type="button" value="0">
        选项一
      </Radio>,
    );
    expect(container).toMatchSnapshot();
  });

  it('type is list', () => {
    const { container } = render(
      <Radio type="list" value="0">
        选项一
      </Radio>,
    );
    expect(container).toMatchSnapshot();
  });

  it('receive new checked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Radio value="0" onChange={onChange}>
        选项一
      </Radio>,
    );
    const radio = container.querySelector('input[type="radio"]');
    fireEvent.click(radio!);
    expect(onChange).toBeCalled();
  });

  it('disabled', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Radio value="0" onChange={onChange} disabled>
        选项一
      </Radio>,
    );
    const radio = container.querySelector('input[type="radio"]');
    fireEvent.click(radio!);
    expect(onChange).not.toBeCalled();
  });
});

describe('Radio.Group', () => {
  it('should render with children', () => {
    const { container } = render(
      <RadioGroup>
        <TestRadio value={1} checked={false} />
        <TestRadio value={2} checked={false} />
      </RadioGroup>,
    );
    expect(container.querySelector('.za-radio-group__inner')?.children).toHaveLength(2);
  });

  // it('should render with cloned react element correctly', () => {
  //   const wrapper = shallow(
  //     <RadioGroup type="button">
  //       <TestRadio value={1} />
  //       <TestRadio value={2} />
  //     </RadioGroup>,
  //   );
  //   expect(wrapper.find(TestRadio).at(0).props()).toEqual({
  //     buttonGhost: false,
  //     buttonShape: 'radius',
  //     buttonSize: 'xs',
  //     value: 1,
  //     checked: false,
  //     type: 'button',
  //     listMarkerAlign: 'before',
  //     disabled: false,
  //     onChange: expect.any(Function),
  //   });
  //   expect(wrapper.find(TestRadio).at(1).props()).toEqual({
  //     buttonGhost: false,
  //     buttonShape: 'radius',
  //     buttonSize: 'xs',
  //     value: 2,
  //     checked: false,
  //     type: 'button',
  //     listMarkerAlign: 'before',
  //     disabled: false,
  //     onChange: expect.any(Function),
  //   });
  // });

  it('renders correctly', () => {
    const { container } = render(
      <Radio.Group value="0" onChange={jest.fn()}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(container).toMatchSnapshot();
  });

  it('receive new value', () => {
    render(
      <Radio.Group value="1" onChange={jest.fn()}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    // wrapper.setProps({ value: '1' });
  });

  it('defaultValue', () => {
    const { container } = render(
      <Radio.Group defaultValue="1">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Radio checked', () => {
    const { container } = render(
      <Radio.Group>
        <Radio value="0">选项一</Radio>
        <Radio value="1" checked>
          选项二
        </Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(container).toMatchSnapshot();
  });

  // 圆角
  it('buttonShape is radius', () => {
    const { container } = render(
      <Radio.Group buttonShape="radius">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(
      container
        .querySelector('.za-radio-group')
        ?.classList?.contains('za-radio-group--button-radius'),
    ).toBe(true);
  });

  // 椭圆角
  it('buttonShape is round', () => {
    const { container } = render(
      <Radio.Group buttonShape="round">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(
      container
        .querySelector('.za-radio-group')
        ?.classList?.contains('za-radio-group--button-round'),
    ).toBe(true);
  });

  // 块级样式
  it('block', () => {
    const { container } = render(
      <Radio.Group block>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(
      container.querySelector('.za-radio-group')?.classList?.contains('za-radio-group--block'),
    ).toBe(true);
  });

  // 列表样式
  it('type is list', () => {
    const { container } = render(
      <Radio.Group type="list">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>
          选项三
        </Radio>
      </Radio.Group>,
    );
    expect(
      container.querySelector('.za-radio-group')?.classList?.contains('za-radio-group--list'),
    ).toBe(true);
  });

  it('radio group onChange event', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Radio.Group buttonShape="round" onChange={onChange}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>
          选项三
        </Radio>
      </Radio.Group>,
    );
    const firstCheckbox = container
      .querySelectorAll('.za-radio')[1]
      .querySelector('input[type="radio"]');
    fireEvent.click(firstCheckbox!);
    expect(onChange).toBeCalledWith('1');
  });
});
