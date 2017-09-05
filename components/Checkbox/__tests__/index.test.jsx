import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Checkbox from '../index';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const wrapper = render(<Checkbox checked onChange={jest.fn()}>foo</Checkbox>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = shallow(<Checkbox disabled>foo</Checkbox>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('checked change false', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Checkbox onChange={onChange}>foo</Checkbox>);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toBeCalledWith(true);
  });

  it('checkbox group renders', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Checkbox.Group onChange={onChange}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('Checkbox').first().simulate('click');
  });

  it('type is button', () => {
    const wrapper = render(
      <Checkbox.Group type="button">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is cell', () => {
    const wrapper = render(
      <Checkbox.Group type="cell">
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  // it('', () => {
  //   const onChange = jest.fn();
  //   const wrapper = render(
  //     <Checkbox.Group type="button" onChange={onChange}>
  //       <Checkbox value="0">选项一</Checkbox>
  //       <Checkbox value="1">选项二</Checkbox>
  //       <Checkbox value="2">选项三</Checkbox>
  //     </Checkbox.Group>
  //   );
  //   wrapper.find('Checkbox').first().simulate('click');
  // });
});
