import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Collapse, { CollapseProps } from '../index';

jest.mock('react', () => ({
  ...(jest.requireActual('react') as typeof React),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('Collapse', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Collapse>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with collapse mode', () => {
    const props: CollapseProps = {};
    props.multiple = true;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with animated', () => {
    const props: CollapseProps = {};
    props.animated = true;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with defaultActiveKey', () => {
    const props: CollapseProps = {};
    props.defaultActiveKey = '1';
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with number defaultActiveKey', () => {
    const props: CollapseProps = {};
    props.defaultActiveKey = 0;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with array defaultActiveKey', () => {
    const props: CollapseProps = {};
    props.multiple = true;
    props.defaultActiveKey = ['1'];
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with activeKey', () => {
    const props: CollapseProps = {};
    props.activeKey = '0';
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with number activeKey', () => {
    const props: CollapseProps = {};
    props.activeKey = 1;
    const wrapper = render(
      <Collapse {...props}>
        <Collapse.Item key={0} title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key={1} title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key={2} title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  // it('renders correctly with dynamic activeKey', () => {
  //   const props = {};
  //   props.activeKey = '0';
  //   const wrapper = shallow(
  //     <Collapse {...props}>
  //       <Collapse.Item key="0" title="Header of Item1">
  //         This is content of item1.
  //       </Collapse.Item>
  //       <Collapse.Item key="1" title="Header of Item2">
  //         This is content of item2.
  //       </Collapse.Item>
  //       <Collapse.Item key="2" title="Header of Item3">
  //         This is content of item3.
  //       </Collapse.Item>
  //     </Collapse>,
  //   );
  //   wrapper.setProps({ activeKey: '1' });
  //   expect(wrapper.state('activeKey')).toEqual('1');
  // });

  // it('renders correctly with dynamic array activeKey', () => {
  //   const props = {};
  //   props.multiple = true;
  //   props.activeKey = ['0'];
  //   const wrapper = shallow(
  //     <Collapse {...props}>
  //       <Collapse.Item key="0" title="Header of Item1">
  //         This is content of item1.
  //       </Collapse.Item>
  //       <Collapse.Item key="1" title="Header of Item2">
  //         This is content of item2.
  //       </Collapse.Item>
  //       <Collapse.Item key="2" title="Header of Item3">
  //         This is content of item3.
  //       </Collapse.Item>
  //     </Collapse>,
  //   );
  //   wrapper.setProps({ activeKey: ['1'] });
  //   expect(wrapper.state('activeKey')).toEqual(['1']);
  // });

  it('renders correctly with defaultActiveKey and activeKey', () => {
    const props: CollapseProps = {};
    props.defaultActiveKey = '0';
    props.activeKey = '1';
    const { container } = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    expect(container.getElementsByClassName('za-collapse-item--active').length).toBe(1);
  });

  it('click collapse item correctly', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Collapse onChange={onChange}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    const items = container.getElementsByClassName('za-collapse-item__title');
    fireEvent.click(items[0]);
    expect(onChange).toBeCalled();
  });

  it('click collapse item correctly with disabled mode', () => {
    const props: CollapseProps = {};
    props.onChange = jest.fn();
    const { container } = render(
      <Collapse {...props}>
        <Collapse.Item disabled key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    const items = container.getElementsByClassName('za-collapse-item__title');
    fireEvent.click(items[0]);
    expect(props.onChange).not.toBeCalled();
  });

  it('collapse items toggle correctly with animated', (done) => {
    const props: CollapseProps = {};
    props.animated = true;
    const { container } = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    const items = container.getElementsByClassName('za-collapse-item__title');
    fireEvent.click(items[0]);

    setTimeout(() => {
      expect(container.getElementsByClassName('za-collapse-item--active').length).toBe(1);
      done();
    }, 0);
  });

  it('negative item toggle correctly with animated', (done) => {
    const props: CollapseProps = {};
    props.animated = true;
    const { container } = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    const items = container.getElementsByClassName('za-collapse-item__title');
    fireEvent.click(items[0]);
    setTimeout(() => {
      expect(container.getElementsByClassName('za-collapse-item--active').length).toBe(1);
      done();
    }, 0);
  });

  it('active item toggle correctly with animated', (done) => {
    const props: CollapseProps = {};
    props.animated = true;
    props.defaultActiveKey = '0';
    const { container } = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    const items = container.getElementsByClassName('za-collapse-item__title');
    fireEvent.click(items[0]);
    setTimeout(() => {
      expect(container.getElementsByClassName('za-collapse-item--active').length).toBe(0);
      done();
    }, 0);
  });

  it('collapse items toggle correctly without multiple mode', () => {
    const props: CollapseProps = {};
    props.multiple = false;
    props.activeKey = '1';
    props.onChange = jest.fn();
    const { container } = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    const items = container.getElementsByClassName('za-collapse-item__title');
    fireEvent.click(items[0]);
    expect(container.getElementsByClassName('za-collapse-item--active').length).toBe(1);
  });

  it('collapse items toggle correctly with multiple mode', () => {
    const props: CollapseProps = {};
    props.multiple = true;
    props.defaultActiveKey = ['0'];

    const { container } = render(
      <Collapse {...props}>
        <Collapse.Item key="0" title="Header of Item1">
          This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="1" title="Header of Item2">
          This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="2" title="Header of Item3">
          This is content of item3.
        </Collapse.Item>
      </Collapse>,
    );
    const items = container.getElementsByClassName('za-collapse-item__title');
    fireEvent.click(items[1]);
    expect(container.getElementsByClassName('za-collapse-item--active').length).toBe(2);
  });

  it('click should not trigger callback without key', () => {
    const props: CollapseProps = {};
    props.onChange = jest.fn();
    const { container } = render(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <div>50元套餐内容</div>
        </Collapse.Item>
      </Collapse>,
    );
    const items = container.getElementsByClassName('za-collapse-item__title');
    fireEvent.click(items[0]);
    expect(props.onChange).not.toBeCalled();
  });
});
