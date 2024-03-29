import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Select from '../index';

describe('Select', () => {
  // const fakeTimers = () => {
  //   performance.timing = () => {};
  // };
  // fakeTimers();

  it('Select', () => {
    const { container } = render(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Select disabled', () => {
    const { container } = render(
      <Select
        disabled
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );

    const select = container.querySelector('.za-select');
    fireEvent.click(select as HTMLDivElement);
    expect(container).toMatchSnapshot();
  });

  it('render defaultValue correctly ', () => {
    const { container } = render(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="2"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Cascader Select', () => {
    // jest.useFakeTimers();
    const { container } = render(
      <Select
        value={['1', '12']}
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
    // wrapper.setProps({ value: ['1', '12'] });
    // jest.runAllTimers();
    // wrapper.unmount();
  });

  // it('Cascader Select init value', () => {
  //   // jest.useFakeTimers();
  //   const wrapper = (
  //     <Select
  //       dataSource={[
  //         {
  //           value: '1',
  //           label: '选项一',
  //           children: [
  //             { value: '11', label: '选项一' },
  //             { value: '12', label: '选项二' },
  //           ],
  //         },
  //         {
  //           value: '2',
  //           label: '选项一',
  //           children: [
  //             { value: '21', label: '选项一' },
  //             { value: '22', label: '选项二' },
  //           ],
  //         },
  //       ]}
  //       value={['1', '12']}
  //       displayAddon="-"
  //     />,
  //   );
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // it('receive new dataSource', () => {
  //   const wrapper = shallow(
  //     <Select
  //       dataSource={[
  //         { value: '1', label: '选项一' },
  //         { value: '2', label: '选项二' },
  //       ]}
  //     />,
  //   );
  //   wrapper.setProps({
  //     dataSource: [
  //       { value: 'a', label: '选项一' },
  //       { value: 'b', label: '选项二' },
  //       { value: 'c', label: '选项三' },
  //     ],
  //   });
  // });

  // it('receive new value', () => {
  //   const wrapper = shallow(
  //     <Select
  //       dataSource={[
  //         { value: '1', label: '选项一' },
  //         { value: '2', label: '选项二' },
  //       ]}
  //     />,
  //   );
  //   wrapper.setProps({ value: '1' });
  // });

  // it('receive new cascader dataSource', () => {
  //   const wrapper = shallow(
  //     <Select
  //       dataSource={[
  //         {
  //           value: '1',
  //           label: '选项一',
  //           children: [
  //             { value: '11', label: '选项一' },
  //             { value: '12', label: '选项二' },
  //           ],
  //         },
  //         {
  //           value: '2',
  //           label: '选项一',
  //           children: [
  //             { value: '21', label: '选项一' },
  //             { value: '22', label: '选项二' },
  //           ],
  //         },
  //       ]}
  //     />,
  //   );

  //   wrapper.setProps({
  //     dataSource: [
  //       {
  //         value: '3',
  //         label: '选项一',
  //         children: [
  //           { value: '31', label: '选项一' },
  //           { value: '32', label: '选项二' },
  //         ],
  //       },
  //       {
  //         value: '4',
  //         label: '选项一',
  //         children: [
  //           { value: '41', label: '选项一' },
  //           { value: '42', label: '选项二' },
  //         ],
  //       },
  //     ],
  //   });
  // });

  it('should trigger onConfirm when press ok button', () => {
    const onConfirmFn = jest.fn();
    const onCancelFn = jest.fn();

    const { container } = render(
      <Select
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        value={['1', '12']}
        onConfirm={onConfirmFn}
        onCancel={onCancelFn}
      />,
    );

    fireEvent.click(container.querySelector('.za-select') as HTMLDivElement);
    jest.useFakeTimers();
    fireEvent.click(document.body.querySelector('.za-picker__confirm') as HTMLDivElement);
    jest.runAllTimers();
    expect(onConfirmFn).toBeCalled();
    expect(onCancelFn).not.toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onConfirmFn = jest.fn();
    const onCancelFn = jest.fn();

    const { container } = render(
      <Select
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        defaultValue={['1', '12']}
        onConfirm={onConfirmFn}
        onCancel={onCancelFn}
      />,
    );
    fireEvent.click(container.querySelector('.za-select') as HTMLDivElement);
    jest.useFakeTimers();
    fireEvent.click(document.body.querySelector('.za-picker__cancel') as HTMLDivElement);
    expect(onCancelFn).toBeCalled();
    expect(onConfirmFn).not.toBeCalled();
  });

  // it('should trigger onMaskClick when click mask', () => {
  //   const onConfirmFn = jest.fn();
  //   const onMaskClick = jest.fn();

  //   const wrapper = mount(
  //     <Select
  //       dataSource={[
  //         {
  //           value: '1',
  //           label: '选项一',
  //           children: [
  //             { value: '11', label: '选项一' },
  //             { value: '12', label: '选项二' },
  //           ],
  //         },
  //         {
  //           value: '2',
  //           label: '选项一',
  //           children: [
  //             { value: '21', label: '选项一' },
  //             { value: '22', label: '选项二' },
  //           ],
  //         },
  //       ]}
  //       visible
  //       defaultValue={['1', '12']}
  //       onConfirm={onConfirmFn}
  //       onMaskClick={onMaskClick}
  //     />
  //   );

  //   wrapper.find('.za-mask').simulate('click');
  //   expect(onMaskClick).toBeCalled();
  // });
});
