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

describe('Marquee', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <div>
        { createMarquee({id: 1, height: 150, direction: 'right', width: '100%', loop: false, scrollAmount: 6, scrollDelay: 5, prefix: 'zarm-marquee'}) }
      </div>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('component props', () => {
    const upMarquee = mount(createMarquee({id: 1, direction: 'up'}));
    const leftMarquee = mount(createMarquee({id: 1, direction: 'left'}));
    const rightMarquee = mount(createMarquee({id: 2, direction: 'right'}));
    const downMarquee = mount(createMarquee({id: 3, direction: 'down'}));
    const marquee = mount(createMarquee({id: 4, direction: ''}));
    expect(leftMarquee.props().direction).toBe('left');
    expect(upMarquee.props().direction).toBe('up');
    expect(rightMarquee.props().direction).toBe('right');
    expect(downMarquee.props().direction).toBe('down');
    expect(marquee.props().direction).toBe('');
  });

  it('getKeyFrameModifierLeft', () => {
    const fn = getKeyFrameModifier('left');
    const modifier = fn('50', 'zarm-marquee-1').replace(/[\r\n\s]/g,"");
    expect(modifier).toEqual(`@-webkit-keyframeszarm-marquee-1{100%{-webkit-transform:translate3d(-50px,0,0);transform:translate3d(-50px,0,0);}}@keyframeszarm-marquee-1{100%{-webkit-transform:translate3d(-50px,0,0);transform:translate3d(-50px,0,0);}}`);
  });

  it('getKeyFrameModifierRight', () => {
    const fn = getKeyFrameModifier('up');
    const modifier = fn('150', 'zarm-marquee-2').replace(/[\r\n\s]/g,"");
    expect(modifier).toEqual(`@-webkit-keyframeszarm-marquee-2{100%{-webkit-transform:translate3d(0,-150px,0);transform:translate3d(0,-150px,0);}}@keyframeszarm-marquee-2{100%{-webkit-transform:translate3d(0,-150px,0);transform:translate3d(0,-150px,0);}}`);
  });

  it('getKeyFrameModifierRight', () => {
    const fn = getKeyFrameModifier('right');
    const modifier = fn('100', 'zarm-marquee-3').replace(/[\r\n\s]/g,"");
    expect(modifier).toEqual(`@-webkit-keyframeszarm-marquee-3{100%{-webkit-transform:translate3d(100px,0,0);transform:translate3d(100px,0,0);}}@keyframeszarm-marquee-3{100%{-webkit-transform:translate3d(100px,0,0);transform:translate3d(100px,0,0);}}`);
  });

  it('getKeyFrameModifierDown', () => {
    const fn = getKeyFrameModifier('down');
    const modifier = fn('200', 'zarm-marquee-4').replace(/[\r\n\s]/g,"");
    expect(modifier).toEqual(`@-webkit-keyframeszarm-marquee-4{100%{-webkit-transform:translate3d(0,200px,0);transform:translate3d(0,200px,0);}}@keyframeszarm-marquee-4{100%{-webkit-transform:translate3d(0,200px,0);transform:translate3d(0,200px,0);}}`);
  });

  it('getKeyFrameModifierDefault', () => {
    const fn = getKeyFrameModifier('default');
    const modifier = fn('250', 'zarm-marquee-5').replace(/[\r\n\s]/g,"");
    expect(modifier).toEqual(`@-webkit-keyframeszarm-marquee-5{100%{-webkit-transform:translate3d(-250px,0,0);transform:translate3d(-250px,0,0);}}@keyframeszarm-marquee-5{100%{-webkit-transform:translate3d(-250px,0,0);transform:translate3d(-250px,0,0);}}`);
  });
  it('animationModifier', () => {
    const modifier = animationModifier(5, true, 0, 'zarm-marquee-4');
    expect(modifier).toEqual(`5s zarm-marquee-4 0s linear infinite`);
  });
});

