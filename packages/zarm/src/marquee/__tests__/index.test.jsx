import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Marquee from '../index';

const createMarquee = (props) => {
  return <Marquee {...props}>测试我在滚动</Marquee>;
};

describe('Marquee', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <div>
        {createMarquee({
          height: 150,
          direction: 'right',
          width: '100%',
          loop: false,
          delay: 5000,
          prefix: 'zarm-marquee',
        })}
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
});
