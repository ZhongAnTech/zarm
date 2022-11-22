import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Image from '../index';

const src =
  'src="https://camo.githubusercontent.com/f5847256d81e5f8c31aee6554f749baf64654a131fed0fca987bd39e023a690f/68747470733a2f2f7a61726d2e64657369676e2f696d616765732f6c6f676f2e31613663666333302e737667"';

describe('Image', () => {
  it('render correctly', () => {
    const { asFragment } = render(<Image src={src} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('width', () => {
    const { asFragment } = render(<Image src={src} width={50} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('height', () => {
    const { asFragment } = render(<Image src={src} height={40} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('placeholder', () => {
    const { asFragment } = render(<Image src={src} placeholder="loading" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('alt', () => {
    const { asFragment } = render(<Image src={src} alt="image" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('shape', () => {
    const { asFragment } = render(<Image src={src} shape="circle" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('fill', () => {
    const { asFragment } = render(<Image src={src} fit="cover" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('fallback', () => {
    const { asFragment } = render(<Image src={src} fallback={<span>图片不见啦</span>} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('onLoad', () => {
    const onLoad = jest.fn();
    render(<Image src={src} alt="test-img" onLoad={onLoad} />);
    const img = screen.getByAltText('test-img');

    fireEvent.load(img);
    expect(onLoad).toHaveBeenCalled();
  });

  it('onError', async () => {
    const onError = jest.fn();
    render(
      <Image src="xx" alt="test-img" fallback={false} placeholder={false} onError={onError} />,
    );
    const img = screen.getByAltText('test-img');

    fireEvent.error(img);
    expect(onError).toHaveBeenCalled();
  });
});
