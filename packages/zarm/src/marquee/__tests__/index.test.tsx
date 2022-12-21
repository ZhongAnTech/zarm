import React from 'react';
import { render } from '@testing-library/react';
import Marquee from '../index';

const createMarquee = (props) => {
  return <Marquee {...props}>测试我在滚动</Marquee>;
};

describe('Marquee', () => {
  it('renders correctly', () => {
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });

  it('renders correctly top', () => {
    const { container } = render(
      <div>
        {createMarquee({
          height: 150,
          direction: 'left',
          width: '100%',
          loop: false,
          delay: 5000,
          prefix: 'zarm-marquee',
        })}
      </div>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly down', () => {
    const { container } = render(
      <div>
        {createMarquee({
          height: 150,
          direction: 'down',
          width: 50,
          loop: false,
          delay: 5000,
          prefix: 'zarm-marquee',
        })}
      </div>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly up', () => {
    const { container } = render(
      <div>
        {createMarquee({
          height: 150,
          direction: 'up',
          width: 50,
          loop: false,
          delay: 5000,
          prefix: 'zarm-marquee',
        })}
      </div>,
    );
    expect(container).toMatchSnapshot();
  });
});
