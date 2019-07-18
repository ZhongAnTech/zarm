import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ClickOutside from '../index';

describe('ClickOutside', () => {
  it('renders correctly', () => {
    const wrapper = render(<ClickOutside onClickOutside={() => {}}><div>test</div></ClickOutside>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not call action on click inside the component', () => {
    const onClickOutside = jest.fn();
    const wrapper = mount(<ClickOutside onClickOutside={onClickOutside}><div id="div">test</div></ClickOutside>);
    const innerNode = wrapper.find('div#div');
    innerNode.simulate('click');
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not call action on click outside the component when disabled', () => {
    const onClickOutside = jest.fn();
    document.body.addEventListener('click', () => {
      //
    });
    const event = new MouseEvent('click');

    mount(<ClickOutside disabled onClickOutside={onClickOutside}><div id="test">test disabled</div></ClickOutside>);
    document.dispatchEvent(event);
    expect(onClickOutside).not.toHaveBeenCalled();
  });
});
