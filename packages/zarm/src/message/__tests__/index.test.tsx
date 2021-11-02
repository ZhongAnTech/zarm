import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Message from '../index';
import ConfigProvider from '../../n-config-provider';

jest.mock('@zarm-design/icons', () => ({
  ...(jest.requireActual('@zarm-design/icons') as any),
  Close: ({ onClick }) => (
    <div onClick={onClick} data-testid="close-icon">
      close icon
    </div>
  ),
}));

describe('Message', () => {
  it('should renders with default props', () => {
    const { container } = render(<Message>foo</Message>);
    expect(container).toMatchSnapshot();
  });

  it('should render with passed theme', () => {
    render(
      <Message data-testid="root" theme="danger">
        foo
      </Message>,
    );
    expect(screen.getByTestId('root').className).toEqual('za-message za-message--danger');
  });

  it('should render with an icon', () => {
    render(
      <Message
        icon={
          <img
            alt="message-icon"
            src="\\static.zhongan.com/website/health/zarm/images/icons/state.png"
          />
        }
      >
        foo
      </Message>,
    );
    expect(screen.getByAltText('message-icon')).toBeTruthy();
    expect(screen.getByAltText('message-icon').parentElement!.className).toEqual(
      'za-message__icon',
    );
  });

  it('should handle click event and call the onClick function passed from props if message has arrow', () => {
    const onClick = jest.fn();
    render(
      <Message data-testid="root" hasArrow onClick={onClick}>
        foo
      </Message>,
    );
    fireEvent.click(screen.getByTestId('root'));
    expect(onClick).toBeCalled();
  });

  it('should handle click event and NOT call the onClick function passed from props if message has no arrow', () => {
    const onClick = jest.fn();
    render(
      <Message data-testid="root" onClick={onClick}>
        foo
      </Message>,
    );
    fireEvent.click(screen.getByTestId('root'));
    expect(onClick).not.toBeCalled();
  });

  it('should do nothing if onClick props is undefined', () => {
    render(
      <Message data-testid="root" hasArrow>
        foo
      </Message>,
    );
    fireEvent.click(screen.getByTestId('root'));
  });

  it('should render close icon and handle close event', () => {
    render(
      <Message closable data-testid="root">
        foo
      </Message>,
    );
    expect(screen.queryByTestId('root')).toBeTruthy();
    expect(screen.getByTestId('close-icon')).toBeTruthy();
    fireEvent.click(screen.getByTestId('close-icon'));
    expect(screen.queryByTestId('root')).toBeFalsy();
  });

  test('should not render footer if message has no arrow and is not closable', () => {
    render(<Message data-testid="root">foo</Message>);
    expect(screen.getByTestId('root').querySelector('.za-message__footer')).toBeFalsy();
  });

  test('should render footer if message has arrow', () => {
    render(
      <Message data-testid="root" hasArrow>
        foo
      </Message>,
    );
    expect(screen.getByTestId('root').className).toEqual(
      'za-message za-message--primary za-message--link',
    );
    expect(screen.getByTestId('root').querySelector('.za-message__footer')).toBeTruthy();
  });

  test('should render footer if message is closable', () => {
    render(
      <Message data-testid="root" closable>
        foo
      </Message>,
    );
    expect(screen.getByTestId('root').querySelector('.za-message__footer')).toBeTruthy();
  });

  test('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Message ref={ref}>foo</Message>);
    expect(ref.current!.nodeName.toLowerCase()).toEqual('div');
  });

  test('should use prefixCls from context', () => {
    render(
      <ConfigProvider prefixCls="zarm">
        <Message data-testid="root">foo</Message>
      </ConfigProvider>,
    );
    expect(screen.getByTestId('root').className).toEqual('zarm-message zarm-message--primary');
  });
});
