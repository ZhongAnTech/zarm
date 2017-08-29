import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Checkbox from '../index';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const wrapper = render(<Checkbox checked onChange={jest.fn()}>foo</Checkbox>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('checked change false', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Checkbox checked onChange={onChange}>foo</Checkbox>);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChange).toBeCalledWith(false);
  });

  // it('group renders correctly', () => {
  //   const onChange = jest.fn();
  //   const wrapper = shallow(
  //     <Checkbox.Group type="button" value={['0']} onChange={onChange}>
  //       <Checkbox value="0">选项一</Checkbox>
  //       <Checkbox value="1">选项二</Checkbox>
  //       <Checkbox value="2">选项三</Checkbox>
  //     </Checkbox.Group>
  //   );
  //   wrapper.find('Checkbox').first().simulate('click');
  // });
});
