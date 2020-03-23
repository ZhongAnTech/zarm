import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilePicker from '../index';

function spyElementPrototypes(Element, properties) {
  const propNames = Object.keys(properties);
  const originDescriptors = {};

  propNames.forEach((propName) => {
    const originDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, propName);
    originDescriptors[propName] = originDescriptor;

    const spyProp = properties[propName];

    if (typeof spyProp === 'function') {
      // If is a function
      Element.prototype[propName] = function spyFunc(...args) {
        return spyProp.call(this, originDescriptor, ...args);
      };
    } else {
      // Otherwise tread as a property
      Object.defineProperty(Element.prototype, propName, {
        ...spyProp,
        set(value) {
          if (spyProp.set) {
            return spyProp.set.call(this, originDescriptor, value);
          }
          return originDescriptor.set(value);
        },
        get() {
          if (spyProp.get) {
            return spyProp.get.call(this, originDescriptor);
          }
          return originDescriptor.get();
        },
      });
    }
  });

  return {
    mockRestore() {
      propNames.forEach((propName) => {
        const originDescriptor = originDescriptors[propName];
        if (typeof originDescriptor === 'function') {
          Element.prototype[propName] = originDescriptor;
        } else {
          Object.defineProperty(Element.prototype, propName, originDescriptor);
        }
      });
    },
  };
}

describe('file picker', () => {
  it('render correctly', () => {
    const props = {
      onChange: jest.fn(),
      children: <button>add</button>,
    };
    const wrapper = render(<FilePicker {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('file picker event', () => {
  const props = {
    accept: 'image/jpg, image/jpeg, image/gif, image/png',
    onChange: jest.fn(),
    quality: 0.3,
    children: <button>add</button>,
  };

  function noOp() {}

  if (typeof window.URL.createObjectURL === 'undefined') {
    Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
  }
  const myImage = new Image(100, 200);
  myImage.src = './test.jpg';

  const file = new File([''], './test.jpg', {
    type: 'image/jpeg',
  });

  it('select image', () => {
    const wrapper = mount(<FilePicker {...props} />);

    wrapper.find('.za-file-picker__input').simulate('change', {
      target: {
        files: [myImage],
      },
    });
    expect(props.onChange).toBeCalled();
  });

  it('select image & onBeforeSelect is not func', () => {
    const _props = {
      ...props,
      multiple: true,
      onBeforeSelect: 'false',
    };

    const wrapper = mount(<FilePicker {..._props} />);

    wrapper.find('.za-file-picker__input').simulate('click');
    wrapper.find('.za-file-picker__input').simulate('change', {
      target: {
        files: [myImage],
      },
    });
    expect(props.onChange).toBeCalled();
  });

  it('select image2', () => {
    const wrapper = mount(<FilePicker {...props} />);

    wrapper.find('.za-file-picker__input').simulate('click');
    wrapper.find('.za-file-picker__input').simulate('change', {
      target: {
        files: [file],
      },
    });

    setTimeout(() => {
      expect(props.onChange).toBeCalled();
    }, 2000);
  });

  it('click children', () => {
    const wrapper = mount(<FilePicker {...props} />);

    wrapper.find('button').simulate('click');
    wrapper.find('.za-file-picker__input').simulate('change', {
      target: {
        files: [myImage],
      },
    });
    expect(props.onChange).toBeCalled();
  });
});

describe('file picker disabled', () => {
  const props = {
    accept: 'image/jpg, image/jpeg, image/gif, image/png',
    onChange: jest.fn(),
    onBeforeSelect: jest.fn(),
    children: <button>foo</button>,
  };

  it('on before select return false', () => {
    const _props = {
      ...props,
      onBeforeSelect: jest.fn(() => false),
    };

    const wrapper = mount(
      <FilePicker
        {..._props}
      />,
    );

    wrapper.find('.za-file-picker__input').simulate('click');
    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('disabled', () => {
    const _props = {
      ...props,
      disabled: true,
    };

    const wrapper = mount(
      <FilePicker
        {..._props}
      />,
    );

    wrapper.find('.za-file-picker__input').simulate('click');
    expect(props.onChange).not.toHaveBeenCalled();
  });
});

describe('picture thumbnail', () => {
  const size = { width: 0, height: 0 };

  const imageSpy = spyElementPrototypes(Image, {
    src: {
      set() {
        if (this.onload) {
          this.onload();
        }
      },
    },
    width: {
      get: () => size.width,
    },
    height: {
      get: () => size.height,
    },
  });

  const drawImageCallback = null;
  // function hookDrawImageCall(callback) {
  //   drawImageCallback = callback;
  // }
  const canvasSpy = spyElementPrototypes(HTMLCanvasElement, {
    getContext: () => ({
      drawImage: (...args) => {
        if (drawImageCallback) drawImageCallback(...args);
      },
      fillRect: (...args) => {
        if (drawImageCallback) drawImageCallback(...args);
      },
    }),

    toDataURL: () => 'data:image/png;base64,',
  });

  afterAll(() => {
    imageSpy.mockRestore();
    canvasSpy.mockRestore();
  });

  const props = {
    accept: 'image/jpg, image/jpeg, image/gif, image/png',
    onChange: jest.fn(),
    children: <button>add</button>,
  };

  const file = new File([''], './test.jpg', {
    type: 'image/jpeg',
  });

  it('create thumbnail', () => {
    const wrapper = mount(<FilePicker {...props} />);

    wrapper.find('.za-file-picker__input').simulate('click');
    wrapper.find('.za-file-picker__input').simulate('change', {
      target: {
        files: [file],
      },
    });

    setTimeout(() => {
      expect(props.onChange).toBeCalled();
    }, 2000);
  });

  it('create thumbnail base64', () => {
    const wrapper = mount(<FilePicker {...props} quality={0.3} />);

    wrapper.find('.za-file-picker__input').simulate('click');
    wrapper.find('.za-file-picker__input').simulate('change', {
      target: {
        files: [file],
      },
    });

    setTimeout(() => {
      expect(props.onChange).toBeCalled();
    }, 2000);
  });

  it('out of quality', () => {
    const wrapper = mount(<FilePicker {...props} quality={1.5} />);

    wrapper.find('.za-file-picker__input').simulate('click');
    wrapper.find('.za-file-picker__input').simulate('change', {
      target: {
        files: [file],
      },
    });

    setTimeout(() => {
      expect(props.onChange).toBeCalled();
    }, 2000);
  });
});
