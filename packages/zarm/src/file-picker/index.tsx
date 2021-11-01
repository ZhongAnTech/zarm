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
import React, { cloneElement, useCallback } from 'react';
import classNames from 'classnames';
import type { FileObject, BaseFilePickerProps } from './interface';
import handleFileInfo from './utils/handleFileInfo';
import { ConfigContext } from '../n-config-provider';

export interface FilePickerProps extends BaseFilePickerProps {
  className?: string;
  style?: React.CSSProperties;
}

const FilePicker = React.forwardRef<unknown, FilePickerProps>((props, ref) => {
  const fileRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = `${globalPrefixCls}-file-picker`;
  const {
    className,
    multiple,
    accept,
    capture,
    disabled,
    children,
    onBeforeSelect,
    onChange,
    quality,
    ...restProps
  } = props;

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}--disabled`]: disabled,
  });

  const handleClick = useCallback(() => {
    fileRef?.current.click();
  }, [fileRef]);

  const handleDefaultInput = useCallback(
    (e) => {
      // 防止选择同一张图片两次造成 onChange 事件不触发
      e.currentTarget.value = '';

      if (typeof onBeforeSelect !== 'function') {
        return;
      }

      // 阻止 input onChange 默认事件
      if (onBeforeSelect() === false || disabled) {
        e.preventDefault();
      }
    },
    [onBeforeSelect, disabled],
  );

  const handleChange = (e) => {
    const files: Array<File> = [].slice.call(e.target.files);
    const fileList: Array<FileObject> = [];

    const getFileInfo = (data: FileObject) => {
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

  const content = cloneElement(children as React.ReactElement, {
    onClick: handleClick,
    className: classNames((children as React.ReactElement).props.className, 'needsclick'), // 修复加载fastClick库后引起的合成事件问题
  });
  return (
    <div className={cls} {...restProps}>
      <input
        className={`${prefixCls}__input`}
        type="file"
        ref={fileRef}
        accept={accept}
        multiple={multiple}
        capture={capture}
        onClick={handleDefaultInput}
        onChange={handleChange}
      />
      {content}
    </div>
  );
});

FilePicker.displayName = 'FilePicker';

FilePicker.defaultProps = {
  disabled: false,
  multiple: false,
  onBeforeSelect: () => true,
};

export default FilePicker;
