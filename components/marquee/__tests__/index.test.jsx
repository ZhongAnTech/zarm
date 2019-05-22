import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Marquee from '../index';
import { getKeyFrameModifier, animationModifier } from '../modifiers';

const createMarquee = (props) => {
  return (
    <Marquee {...props}>测试我在滚动</Marquee>
  );
};

const trim = (str) => {
  return str.replace(/[\r\n\s]/g, '');
};

describe('Marquee', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <div>
        { createMarquee({ height: 150, direction: 'right', width: '100%', loop: false, animationDuration: 6000, animationDelay: 5000, prefix: 'zarm-marquee' }) }
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('component props', () => {
    const upMarquee = mount(createMarquee({ direction: 'up' }));
    const leftMarquee = mount(createMarquee({ direction: 'left' }));
    const rightMarquee = mount(createMarquee({ direction: 'right' }));
    const downMarquee = mount(createMarquee({ direction: 'down' }));
    const marquee = mount(createMarquee({ direction: '' }));
    expect(leftMarquee.props().direction).toBe('left');
    expect(upMarquee.props().direction).toBe('up');
    expect(rightMarquee.props().direction).toBe('right');
    expect(downMarquee.props().direction).toBe('down');
    expect(marquee.props().direction).toBe('');
  });

  it('getKeyFrameModifierLeft', () => {
    const fn = getKeyFrameModifier('left');
    const modifier = trim(fn('50', 'zarm-marquee-1'));
    const result = `@-webkit-keyframeszarm-marquee-1{100%{-webkit-transform:translate3d(-50px,0,0);transform:translate3d(-50px,0,0);}}
    @keyframeszarm-marquee-1{100%{-webkit-transform:translate3d(-50px,0,0);transform:translate3d(-50px,0,0);}}`;
    expect(modifier).toEqual(trim(result));
  });

  it('getKeyFrameModifierRight', () => {
    const fn = getKeyFrameModifier('up');
    const modifier = trim(fn('5', 'zarm-marquee-2'));
    const result = `@-webkit-keyframeszarm-marquee-2{100%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0);}}
    @keyframeszarm-marquee-2{100%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0);}}`;
    expect(modifier).toEqual(trim(result));
  });

  it('getKeyFrameModifierRight', () => {
    const fn = getKeyFrameModifier('right');
    const modifier = trim(fn('100', 'zarm-marquee-3'));
    const result = `@-webkit-keyframeszarm-marquee-3{100%{-webkit-transform:translate3d(100px,0,0);transform:translate3d(100px,0,0);}}
    @keyframeszarm-marquee-3{100%{-webkit-transform:translate3d(100px,0,0);transform:translate3d(100px,0,0);}}`;
    expect(modifier).toEqual(trim(result));
  });

  it('getKeyFrameModifierDown', () => {
    const fn = getKeyFrameModifier('down');
    const modifier = trim(fn('200', 'zarm-marquee-4'));
    const result = `@-webkit-keyframeszarm-marquee-4{100%{-webkit-transform:translate3d(0,200px,0);transform:translate3d(0,200px,0);}}
    @keyframeszarm-marquee-4{100%{-webkit-transform:translate3d(0,200px,0);transform:translate3d(0,200px,0);}}`;
    expect(modifier).toEqual(trim(result));
  });

  it('getKeyFrameModifierDefault', () => {
    const fn = getKeyFrameModifier('default');
    const modifier = trim(fn('250', 'zarm-marquee-5'));
    const result = `@-webkit-keyframeszarm-marquee-5{100%{-webkit-transform:translate3d(-250px,0,0);transform:translate3d(-250px,0,0);}}
    @keyframeszarm-marquee-5{100%{-webkit-transform:translate3d(-250px,0,0);transform:translate3d(-250px,0,0);}}`;
    expect(modifier).toEqual(trim(result));
  });
  it('animationModifier', () => {
    const modifier = animationModifier(5000, true, 0, 'zarm-marquee-4');
    expect(modifier).toEqual('5000ms zarm-marquee-4 0ms linear infinite');
  });
});
