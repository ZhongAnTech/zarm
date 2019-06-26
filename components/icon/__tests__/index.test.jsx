import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../index';
import SvgCcomponent from '../component';

describe('Icon', () => {
  it('renders all Icons', () => {
    const wrapper = render(
      <div>
        <Icon theme="primary" type="add" />
        <Icon theme="primary" type="arrow-right" />
        <Icon theme="primary" type="broadcast" />
        <Icon theme="primary" type="info-round" />
        <Icon theme="primary" type="keyboard" />
        <Icon theme="primary" type="minus" />
        <Icon theme="primary" type="right-round-fill" />
        <Icon theme="primary" type="right-round" />
        <Icon theme="primary" type="right" />
        <Icon theme="primary" type="search" />
        <Icon theme="primary" type="wrong-round-fill" />
        <Icon theme="primary" type="wrong-round" />
        <Icon theme="primary" type="wrong" />
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons of different theme correctly', () => {
    const wrapper = render(
      <div>
        <Icon theme="primary" type="right" />
        <Icon theme="success" type="add" />
        <Icon theme="warning" type="info-round" />
        <Icon theme="danger" type="wrong-round-fill" />
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons of different size correctly', () => {
    const wrapper = render(
      <div>
        <Icon size="xl" theme="primary" type="broadcast" />
        <Icon size="lg" theme="primary" type="broadcast" />
        <Icon size="sm" theme="primary" type="broadcast" />
        <Icon size="xs" theme="primary" type="broadcast" />
        <Icon size={20} theme="primary" type="broadcast" />
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
