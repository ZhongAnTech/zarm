import { render } from '@testing-library/react';
import { createBEM } from '@zarm-design/bem';
import React, { useEffect, useRef } from 'react';
import { defaultConfig } from '../../config-provider/ConfigProvider';
import Panel from '../index';

const bem = createBEM('panel', { prefixCls: defaultConfig.prefixCls });

describe('Panel', () => {
  test('snapshots with title and more props', () => {
    const { asFragment } = render(
      <Panel title="title" more="more">
        body
      </Panel>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  test('should not render header if do not have title and more props', () => {
    const { container } = render(<Panel>body</Panel>);
    expect(container.children).toHaveLength(1);
    expect(container.querySelector(`.${bem('header')}`)).not.toBeInTheDocument();
    expect(container.querySelector(`.${bem('body')}`)).toBeInTheDocument();
  });

  test('should accept custom css vars', () => {
    const { container } = render(
      <Panel title="title" style={{ '--header-padding': 0 }}>
        body
      </Panel>,
    );
    expect(container.querySelector(`.${bem('header')}`)).toHaveStyle({
      padding: 'var(--header-padding)',
    });
  });

  test('should forward ref created by React.createRef() API', (done) => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Panel bordered={false} ref={ref}>
        body
      </Panel>,
    );
    if (!ref.current) return done('ref.current does not exist');
    expect(ref.current.className).toEqual('za-panel');
    expect(ref.current.nodeName.toLocaleLowerCase()).toBe('div');
    done();
  });

  test('should forward ref created by useRef() hook', (done) => {
    expect.assertions(2);
    const TestComp = () => {
      const ref = useRef<HTMLDivElement>(null);
      useEffect(() => {
        if (ref.current) {
          expect(ref.current.className).toEqual('za-panel');
          expect(ref.current.nodeName.toLocaleLowerCase()).toBe('div');
          done();
        }
      }, []);
      return (
        <Panel bordered={false} ref={ref}>
          body
        </Panel>
      );
    };
    render(<TestComp />);
  });
});
