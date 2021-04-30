import React from 'react';
import { Alert } from 'react-native';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Message from '../index.native';

describe('Message', () => {
  it('renders correctly', () => {
    const wrapper = render(<Message>This is a Message</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('theme', () => {
    const wrapper = render(<Message theme="danger">This is a Message</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onClick', () => {
    const wrapper = render(
      <Message onClick={() => Alert.alert('click this message!')}>Message</Message>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('closable', () => {
    const wrapper = render(<Message closable>可关闭</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
