import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BScroll from 'better-scroll';
import { mocked } from 'ts-jest/utils';
import Wheel from '../../wheel';
import PickerView from '../index';
import parseProps from '../utils/parseProps';
import type { PickerDataSource } from '../PropsType';

// TODO: make mock package for better-scroll package
const bsScrollInstance = {
  on: jest.fn().mockImplementationOnce((event, handler) => {
    if (event === 'scrollEnd') {
      handler();
    }
  }),
  destroy: jest.fn(),
  getSelectedIndex: jest.fn(),
  refresh: jest.fn(),
  wheelTo: jest.fn(),
  disable: jest.fn(),
  stop: jest.fn(),
};

jest.mock('better-scroll', () => {
  return jest.fn(() => bsScrollInstance);
});

const mockedBScroll = mocked(BScroll);

describe('PickerView', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should not render wheels if datasource is empty', () => {
    const wrapper = shallow(<PickerView />);
    expect(wrapper.find('.za-picker-view__content').children()).toHaveLength(0);
  });

  it('should render wheels if datasource is not empty', () => {
    const dataSource: PickerDataSource = [
      { label: 'a', value: 1 },
      { label: 'b', value: 2 },
    ];
    const wrapper = shallow(<PickerView dataSource={dataSource} />);
    expect(wrapper.state('dataSource')).toEqual([
      [
        { label: 'a', value: 1 },
        { label: 'b', value: 2 },
      ],
    ]);
    expect(wrapper.find('.za-picker-view__content').children()).toHaveLength(1);
    expect(wrapper.find(Wheel).props()).toEqual(
      expect.objectContaining({
        dataSource: [
          { label: 'a', value: 1 },
          { label: 'b', value: 2 },
        ],
        value: 1,
        valueMember: 'value',
        itemRender: PickerView.defaultProps.itemRender,
        disabled: false,
        onChange: expect.any(Function),
        stopScroll: false,
      }),
    );
  });

  it('should render with correct className', () => {
    const wrapper = shallow(<PickerView className="foo" />);
    expect(wrapper.at(0).prop('className')).toEqual('za-picker-view foo');
    expect(wrapper.find('.za-picker-view__content')).toHaveLength(1);
    expect(wrapper.find('.za-picker-view__mask')).toHaveLength(2);
    expect(wrapper.find('.za-picker-view__mask--top')).toHaveLength(1);
    expect(wrapper.find('.za-picker-view__mask--bottom')).toHaveLength(1);
  });

  it('should handle value change event and re-render wheels with new props', () => {
    const getSourceSpy = jest.spyOn(parseProps, 'getSource');
    bsScrollInstance.getSelectedIndex.mockReturnValueOnce(1);

    mockedBScroll.mockReturnValueOnce(bsScrollInstance as any);
    const dataSource: PickerDataSource = [
      { label: 'a', value: 1 },
      { label: 'b', value: 2 },
    ];
    const props = { onChange: jest.fn(), dataSource };
    const wrapper = mount(<PickerView {...props} />);
    expect(bsScrollInstance.on).toBeCalledWith('scrollEnd', expect.any(Function));

    expect(getSourceSpy).toBeCalledWith({
      dataSource: props.dataSource,
      value: [2],
      valueMember: 'value',
      cols: Infinity,
    });

    expect(props.onChange).toBeCalledWith([{ label: 'b', value: 2 }], 0);
    expect(wrapper.state('value')).toEqual([2]);
    expect(wrapper.state('objValue')).toEqual([{ label: 'b', value: 2 }]);
    expect(wrapper.state('dataSource')).toEqual([
      [
        { label: 'a', value: 1 },
        { label: 'b', value: 2 },
      ],
    ]);
    expect(wrapper.find(Wheel).props()).toEqual(
      expect.objectContaining({
        dataSource: [
          { label: 'a', value: 1 },
          { label: 'b', value: 2 },
        ],
        value: 2,
        valueMember: 'value',
        itemRender: PickerView.defaultProps.itemRender,
        disabled: false,
        onChange: expect.any(Function),
        stopScroll: false,
      }),
    );
  });

  it('PickerView render visible', () => {
    const wrapper = render(
      <PickerView
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('PickerView disabled', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <PickerView
        disabled
        onChange={onChange}
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );
    expect(onChange).not.toBeCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
