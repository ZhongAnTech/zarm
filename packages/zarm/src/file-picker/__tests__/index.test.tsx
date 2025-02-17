import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import { mockCreateObjectURL, mockResetCreateObjectURL } from '../../../tests/utils';
import FilePicker from '../index';
import type { FileObject } from '../interface';
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    const { container } = render(<FilePicker {..._props} />);

    const mClickEvent = { preventDefault: jest.fn() };
    const fileInput = container.querySelectorAll('.za-file-picker__input')[0];
    fireEvent.change(fileInput, mClickEvent);
    expect(mClickEvent.preventDefault).not.toBeCalled();

    fireEvent.change(fileInput, {
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
    const { container } = render(<FilePicker {...props} />);
    const fileInput = container.querySelectorAll('.za-file-picker__input')[0];
    fireEvent.change(fileInput, {
      target: { files: [file] },
    });
    expect(mHandleFileInfo).toBeCalledWith({ file, quality: 0.3 }, getFileInfo!);
    expect(props.onChange).toBeCalledWith(mFileDetail);
  });

  it('click children', () => {
    const { container } = render(<FilePicker {...props} />);

    const fileInput = container.querySelectorAll('.za-file-picker__input')[0];
    fireEvent.change(fileInput, {
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

    const { container } = render(<FilePicker {..._props} />);

    const fileInput = container.querySelectorAll('.za-file-picker__input')[0];
    fireEvent.change(fileInput);
    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('disabled', () => {
    const _props = {
      ...props,
      disabled: true,
    };

    const { container } = render(<FilePicker {..._props} />);

    const fileInput = container.querySelectorAll('.za-file-picker__input')[0];
    fireEvent.change(fileInput);
    expect(props.onChange).not.toHaveBeenCalled();
  });
});
