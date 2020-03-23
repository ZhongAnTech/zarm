/**
 * 设置选择前的方法，获取选择文件的相关信息，需要时可以对图片进行压缩、改变图片尺寸。
 *
 * multiple: 默认为 false，设置为 true 之后一次可以选择多张，onChange 事件调用之后返回一个数组，
 *           不设置或者设置为 false，onChange 事件调用之后返回一个对象。
 * disabled: 传递之后不可以点击上传，整个选择组件会设置为半透明状态，透明度为 0.5。
 * quality: 没有默认值，不设置不会进行压缩。
 * accept: 设置选择的文件类型，默认为所有类型，只有文件类型为图片（image/*）的时候会有本地预览图。
 * onChange: () => { file, fileType, fileSize, fileName, thumbnail }。
 * onBeforeSelect: () => boolean，返回 false 的时候阻止后续的选择事件。
 */
import React, { PureComponent, cloneElement, MouseEventHandler, ChangeEventHandler } from 'react';
import classNames from 'classnames';
import PropsType from './PropsType';
import handleFileInfo from './utils/handleFileInfo';

export interface FilePickerProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export interface IFileDetail {
  file: File;
  fileType: string;
  fileSize: number;
  fileName: string;
  thumbnail: string;
}

export default class FilePicker extends PureComponent<FilePickerProps, {}> {
  static defaultProps = {
    prefixCls: 'za-file-picker',
    disabled: false,
    multiple: false,
    onBeforeSelect: () => true,
  };

  private file: HTMLInputElement | null = null;

  handleDefaultInput: MouseEventHandler<HTMLInputElement> = (e) => {
    // 防止选择同一张图片两次造成 onChange 事件不触发
    e.currentTarget.value = '';

    const { onBeforeSelect, disabled } = this.props;
    if (typeof onBeforeSelect !== 'function') {
      return;
    }

    // 阻止 input onChange 默认事件
    if (onBeforeSelect() === false || disabled) {
      e.preventDefault();
    }
  };

  handleClick = () => {
    this.file!.click();
  };

  handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { onChange, quality, multiple } = this.props;
    const files: Array<File> = [].slice.call(e.target.files);
    const fileList: Array<IFileDetail> = [];

    const getFileInfo = (data: IFileDetail) => {
      if (multiple) {
        fileList.push(data);

        if (files.length === fileList.length && typeof onChange === 'function') {
          onChange(fileList);
        }
      } else {
        typeof onChange === 'function' && onChange(data);
      }
    };

    if (files) {
      files.map((file) => handleFileInfo({ file, quality }, getFileInfo));
    }
  };

  render() {
    const { prefixCls, className, multiple, accept, capture, disabled, children } = this.props;

    const cls = classNames(prefixCls, className, {
      [`${prefixCls}--disabled`]: disabled,
    });

    const content = cloneElement(children, {
      onClick: this.handleClick,
      className: 'needsclick', // 修复加载fastClick库后引起的合成事件问题
    });

    return (
      <div className={cls}>
        <input
          className={`${prefixCls}__input`}
          type="file"
          ref={(ele) => { this.file = ele; }}
          accept={accept}
          multiple={multiple}
          capture={capture}
          onClick={this.handleDefaultInput}
          onChange={this.handleChange}
        />
        {content}
      </div>
    );
  }
}
