import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Calendar from '../index';

describe('Calendar', () => {
  it('Calendar render', () => {
    const wrapper = mount(<Calendar defaultValue="2018-08-02" value="2018-08-02" min="2018-05-06" max="2019-05-02" multiple={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger onChange when press day', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Calendar defaultValue="2018-08-02" value="2018-08-02" min="2018-05-06" max="2019-05-02" multiple={false} onChange={onChange} />);
    wrapper.find('.comp-day-item.d7')[0].simulate('click');
    expect(onChange).toBeCalled();
  });
});
