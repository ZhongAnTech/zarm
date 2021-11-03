import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mocked } from 'ts-jest/utils';
import FilePicker from '../index';
import type { FileObject } from '../interface';
import { mockCreateObjectURL, mockResetCreateObjectURL } from '../../../tests/utils';
import handleFileInfo from '../utils/handleFileInfo';

jest.mock('../utils/handleFileInfo');

const mHandleFileInfo = mocked(handleFileInfo);

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
  const mCreateObjectURL = jest.fn();
  const file = new File([''], './test.jpg', { type: 'image/jpeg' });
  const mFileDetail = {
    file,
    fileType: file.type,
    fileName: file.name,
    fileSize: file.size,
    thumbnail: 'data:,',
  };

  beforeAll(() => {
    mockCreateObjectURL(mCreateObjectURL);
  });
  afterAll(() => {
    mockResetCreateObjectURL();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('select image & onBeforeSelect is not func', () => {
    const _props = {
      ...props,
      multiple: true,
      onBeforeSelect: false as any,
    };
    mHandleFileInfo.mockImplementation((_, callback: (data: FileObject) => void) => {
      callback(mFileDetail);
    });
    const wrapper = mount(<FilePicker {..._props} />);

    const mClickEvent = { preventDefault: jest.fn() };
    wrapper.find('.za-file-picker__input').simulate('click', mClickEvent);
    expect(mClickEvent.preventDefault).not.toBeCalled();

    wrapper.find('.za-file-picker__input').simulate('change', {
      target: { files: [file] },
    });
    expect(props.onChange).toBeCalledWith([mFileDetail]);
    expect(props.onChange).toBeCalledTimes(1);
  });

  it('should handle change event if files is an array of File instance', () => {
    let getFileInfo: (data: FileObject) => void;
    mHandleFileInfo.mockImplementation((_, callback: (data: FileObject) => void) => {
      getFileInfo = callback;
      callback(mFileDetail);
    });
    const wrapper = mount(<FilePicker {...props} />);
    wrapper.find('.za-file-picker__input').simulate('change', {
      target: { files: [file] },
    });

    expect(mHandleFileInfo).toBeCalledWith({ file, quality: 0.3 }, getFileInfo!);
    expect(props.onChange).toBeCalledWith(mFileDetail);
  });

  it('click children', () => {
    const wrapper = mount(<FilePicker {...props} />);

    wrapper.find('button').simulate('click');
    wrapper.find('.za-file-picker__input').simulate('change', {
      target: { files: [file] },
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

    const wrapper = mount(<FilePicker {..._props} />);

    wrapper.find('.za-file-picker__input').simulate('click');
    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('disabled', () => {
    const _props = {
      ...props,
      disabled: true,
    };

    const wrapper = mount(<FilePicker {..._props} />);

    wrapper.find('.za-file-picker__input').simulate('click');
    expect(props.onChange).not.toHaveBeenCalled();
  });
});
