import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ImagePreview from '..';
import { images, originImages } from '../../../tests/testData/images';
import { sleep } from '../../../tests/utils';
import Button from '../../button';

const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');

describe('ImagePreview', () => {
  let onloadRef: Function | undefined;
  beforeAll(() => {
    Object.defineProperty(Image.prototype, 'onload', {
      get() {
        return this._onload;
      },
      set(onload: Function) {
        onloadRef = onload;
        this._onload = onload;
      },
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = render(
        <ImagePreview visible onChange={jest.fn()} images={images} mountContainer={false} />,
      );
      expect(wrapper.asFragment()).toMatchSnapshot();
    });

    it('renders correctly with origin', () => {
      const wrapper = render(
        <ImagePreview visible onChange={jest.fn()} images={originImages} mountContainer={false} />,
      );
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });

  it('should render show origin url button if origin url is not existed', () => {
    const { container } = render(<ImagePreview images={images} visible />);
    const buttonWrapper = container.querySelectorAll('.za-image-preview button');
    expect(buttonWrapper).toHaveLength(0);
  });

  it('should not call onClose handler when touch end and the duration between touchstart and touchend greater than 300ms', async () => {
    const mOnClose = jest.fn();
    render(<ImagePreview visible images={images} onClose={mOnClose} />);
    const contentWrapper = document.body.getElementsByClassName('za-image-preview__content')[0];
    fireEvent.mouseDown(contentWrapper);
    fireEvent.mouseMove(contentWrapper);
    await sleep(500);
    fireEvent.mouseUp(contentWrapper);
    expect(mOnClose).not.toBeCalled();
  });

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 375 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 200 });
  });
  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetWidth!);
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight!);
  });

  it('onChange', () => {
    const onChange = jest.fn();
    render(<ImagePreview visible images={images} onChange={onChange} />);
    const element = document.body.querySelector('.za-carousel');
    fireEvent.mouseDown(element!, { pointerId: 1, clientX: 0, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element!, { pointerId: 1, clientX: -200, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(element!, { pointerId: 1, clientX: -275 });
    expect(onChange).toBeCalledTimes(1);
  });

  it('onClose', async () => {
    jest.useFakeTimers();
    const mOnClose = jest.fn();
    render(<ImagePreview visible images={images} onClose={mOnClose} />);
    const content = document.body.querySelector('.za-image-preview__content');
    fireEvent.mouseDown(content!, { pointerId: 10, clientX: 20, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(content!, { pointerId: 10, clientX: 20, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(content!, { pointerId: 10, clientX: 20 });
    jest.runAllTimers();
    // expect(mOnClose).toBeCalledTimes(1);
  });

  it('load origin', async () => {
    jest.useFakeTimers();
    const { getByText } = render(<ImagePreview visible images={originImages} className="test1" />);
    const content = getByText('查看原图');
    fireEvent.mouseDown(content!, { pointerId: 10, clientX: 20, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(content!, { pointerId: 10, clientX: 20, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(content!, { pointerId: 10, clientX: 20 });
    act(() => {
      onloadRef?.();
      jest.runAllTimers();
    });
    const newContent = document.body.querySelector('.test1 button');
    expect(newContent).not.toBeInTheDocument();
  });

  it('should render pagination', () => {
    render(<ImagePreview visible images={images} />);
    const paginationWrapper = document.body.getElementsByClassName('za-image-preview__pagination');
    expect(paginationWrapper).toHaveLength(1);
    expect(paginationWrapper[0].textContent).toContain('1 / 3');
  });

  it('should not render pagination', () => {
    render(<ImagePreview visible images={images} showPagination={false} />);
    expect(document.body.getElementsByClassName('za-image-preview__pagination')).toHaveLength(0);
  });

  it('should render images', () => {
    render(<ImagePreview visible images={images} />);
    const img = document.body.querySelectorAll('img');
    expect(img!).toHaveLength(3);
    const srcArr = Array.from(img).map((v) => v.getAttribute('src'));
    expect(srcArr).toEqual(images);
  });

  it('show', async () => {
    const onClick = async () => {
      await ImagePreview.show({
        images,
        className: 'image-static',
      });
    };

    render(<Button onClick={onClick}>show</Button>);
    const button = screen.getByText('show');
    fireEvent.click(button);
    expect(document.body.getElementsByClassName('image-static')[0]).toBeInTheDocument();
  });
});
