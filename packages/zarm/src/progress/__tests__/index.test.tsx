import { render } from '@testing-library/react';
import React from 'react';
import Progress from '../index';

describe('Progress', () => {
  it('renders correctly', () => {
    const { container } = render(<Progress percent={10} />);
    expect(container).toMatchSnapshot();
  });

  it('renders has children correctly', () => {
    const { container } = render(<Progress percent={10}>foo</Progress>);
    expect(container).toMatchSnapshot();
  });

  describe('circle shape progress', () => {
    it('renders shape is circle correctly', () => {
      const { container } = render(
        <Progress shape="circle" strokeShape="rect" percent={10}>
          foo
        </Progress>,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders shape is semi-circle correctly', () => {
      const { container } = render(
        <Progress shape="semi-circle" percent={10}>
          foo
        </Progress>,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders percent correctly', () => {
      const { container } = render(
        <Progress
          shape="circle"
          percent={10}
          text={(percent) => <div className="test-progress">{percent}</div>}
        />,
      );
      expect(container.querySelectorAll('.test-progress')[0].textContent).toEqual('10');
      expect(container).toMatchSnapshot();
    });
  });

  describe('line shape progress', () => {
    it('renders size is lg correctly', () => {
      const { container } = render(<Progress shape="line" percent={10} size="lg" />);
      expect(container.querySelectorAll('.za-progress--lg')).toHaveLength(1);
      expect(container).toMatchSnapshot();
    });

    it('renders size is md correctly', () => {
      const { container } = render(<Progress shape="line" percent={10} size="md" />);
      expect(container.querySelectorAll('.za-progress--md')).toHaveLength(1);
      expect(container).toMatchSnapshot();
    });

    it('renders size is sm correctly', () => {
      const { container } = render(<Progress shape="line" percent={10} size="sm" />);
      expect(container.querySelectorAll('.za-progress--sm')).toHaveLength(1);
      expect(container).toMatchSnapshot();
    });
  });
});
