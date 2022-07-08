import React from 'react';
import toJson from 'enzyme-to-json';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Image from '../index';

const src =
  'src="https://camo.githubusercontent.com/f5847256d81e5f8c31aee6554f749baf64654a131fed0fca987bd39e023a690f/68747470733a2f2f7a61726d2e64657369676e2f696d616765732f6c6f676f2e31613663666333302e737667"';

describe('Image', () => {
  it('renders correctly', () => {
    const wrapper = render(<Image src={src} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('width', () => {
    const wrapper = render(<Image src={src} width={40} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('height', () => {
    const wrapper = render(<Image src={src} height={40} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('placeholder', () => {
    const wrapper = render(<Image src={src} placeholder="loading" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('alt', () => {
    const wrapper = render(<Image src={src} alt="image" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('fallback', () => {
    const wrapper = render(<Image src={src} fallback={<span>图片不见啦</span>} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('onLoad', () => {
  //   const onLoad = jest.fn();
  //   render(<Image src={src} onLoad={onLoad} />);
  //   expect(onLoad).toHaveBeenCalled();
  // });

  it('onError', async () => {
    const onError = jest.fn();
    const dom = render(
      <Image src="xxx" alt="test" fallback={false} placeholder={false} onError={onError} />,
    );
    const img = dom.querySelector('img');
    console.log(img);
    fireEvent.error(dom.querySelector('img'));
    jest.setTimeout(5000);
    await waitFor(() => expect(onError).toHaveBeenCalled());
  });
});
