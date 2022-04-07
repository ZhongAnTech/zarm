import { shallow } from 'enzyme';
import React from 'react';
import Modal from '../../modal';
import Alert from '../Alert';

describe('Alert', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Alert animationType="door" />);
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.prop('className')).toEqual('za-alert');
  });
});
