import React, {
  useEffect,
  useState,
  ReactNode,
  useCallback,
  memo,
  useMemo,
  useContext,
  forwardRef,
  createRef,
} from 'react';
import { createBEM } from '@zarm-design/bem';
import type { HTMLProps } from '../utils/utilityTypes';
import { ConfigContext } from '../n-config-provider';
import Popup from '../popup';
import Tabs from '../tabs';
import Radio from '../radio';
import Actions from './Actions';
import type { BaseStackPickerProps, TDataSource, IDataSource } from './Interface';

export interface StackPickerCssVars {
  '--background'?: React.CSSProperties['background'];
  '--shadow'?: React.CSSProperties['boxShadow'];
  '--error-color'?: React.CSSProperties['color'];
  '--item-font-size'?: React.CSSProperties['fontSize'];
  '--crumbs-line-height'?: React.CSSProperties['lineHeight'];
  '--item-line-height'?: React.CSSProperties['lineHeight'];
  '--padding'?: React.CSSProperties['padding'];
  '--left'?: React.CSSProperties['left'];
}

export type StackPickerProps = BaseStackPickerProps & HTMLProps<StackPickerCssVars>;

const StackPicker = forwardRef<unknown, StackPickerProps>((props, ref) => {
  const {
    className,
    dataSource,
    defaultValue,
    value,
    displayMember,
    valueMember,
    title,
    visible,
    maskClosable,
    cols,
    cancelText,
    confirmText,
    mountContainer,
    itemRender,
    onChange,
    onConfirm,
    onCancel,
    ...restProps
  } = props;
  const stackPickerRef = (ref as any) || createRef<HTMLDivElement>();
  const { prefixCls, locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.StackPicker;
  const bem = createBEM('stack-picker', { prefixCls });
  const tabsBem = createBEM('stack-picker-tabs', { prefixCls });
  const cls = bem([className]);
  const [currentValue, setCurrentValue] = useState<IDataSource[]>([]);
  const [currentVisible, setCurrentVisible] = useState(visible);
  const [tabIndex, setTabIndex] = useState(0);

  const handleObtainItem = useCallback(
    (list: typeof dataSource, _value: ReactNode) => {
      return list.find((item) => item[valueMember as 'value'] === _value);
    },
    [valueMember],
  );

  useEffect(() => {
    setCurrentVisible(visible);
  }, [visible]);

  /**
   * 初始化列表值
   */
  useEffect(() => {
    const initValue: typeof dataSource = [];
    const v = value || defaultValue || [];

    v.reduce((accumulator: IDataSource[], _currentValue: ReactNode) => {
      const valueItem = handleObtainItem(accumulator, _currentValue);

      if (valueItem) {
        initValue.push(valueItem);

        return valueItem.children || [];
      }

      return [];
    }, dataSource);

    setCurrentValue(initValue);
    setTabIndex(initValue.length);
  }, [dataSource, handleObtainItem, value, defaultValue]);

  /**
   * 点击遮罩
   */
  const handleMaskClick = () => {
    if (!maskClosable) return;

    if (onCancel) {
      if (typeof onCancel !== 'function') {
        console.error('onCancel need a function');
      } else {
        onCancel();
      }
    }

    setCurrentVisible(!currentVisible);
  };

  /**
   * 点击取消按钮
   */
  const handleCancel = () => {
    if (onCancel) {
      if (typeof onCancel !== 'function') {
        console.error('onCancel need a function');
      } else {
        onCancel();
      }
    }
  };

  /**
   * 获取列表数据
   */
  const columnDataList = useMemo(() => {
    const group: { selected: IDataSource | undefined; options: IDataSource[] }[] = [];
    let _dataSource: typeof dataSource = dataSource;
    let i = 0;

    while (_dataSource.length) {
      const colVal = currentValue[i];

      const selected =
        !!colVal && handleObtainItem(_dataSource, colVal[valueMember as keyof ReactNode]);

      group.push({
        selected,
        options: _dataSource,
      });

      const childrenData: typeof dataSource | undefined = ((selected ?? _dataSource[0]) || {})
        .children;

      if (i < currentValue.length && childrenData && childrenData.length && i + 1 < cols!) {
        _dataSource = childrenData;
      } else {
        _dataSource = [];
      }

      i += 1;
    }

    return group;
  }, [cols, currentValue, dataSource, handleObtainItem, valueMember]);

  /**
   * 修改列表值
   * @param itemValue
   * @param index
   */
  const handleChange = (itemValue: any, index: number) => {
    const _value = currentValue.slice(0, index);

    if (typeof index === 'number') {
      _value[index] = handleObtainItem(columnDataList[index].options, itemValue)!;
      setTabIndex(index + 1);
    }

    setCurrentValue(_value);

    if (onChange) {
      if (typeof onChange !== 'function') {
        console.error('onChange need a function');
      } else {
        onChange(_value.map((v) => v![valueMember as 'value']));
      }
    }
  };

  /**
   * 点击确认按钮
   */
  const handleOk = () => {
    if (onConfirm) {
      if (typeof onConfirm !== 'function') {
        console.error('onConfirm need a function');
      } else {
        onConfirm(currentValue.map((v) => v![valueMember as 'value']));
      }
    }
  };

  /**
   * 判断是否有传入 itemRender， 否则使用默认的渲染方式
   * @param item
   */
  const handleItemRender = (item: TDataSource) => {
    return typeof itemRender !== 'function' ? item[displayMember as 'label'] : itemRender(item);
  };

  return (
    <Popup
      ref={stackPickerRef}
      direction="bottom"
      mountContainer={mountContainer}
      visible={currentVisible}
      onMaskClick={handleMaskClick}
    >
      <div className={cls} {...restProps}>
        <div className={bem('container')}>
          <Actions
            {...{
              bem,
              cancelText,
              confirmText,
              title,
              handleCancel,
              handleOk,
              locale,
            }}
          />
          <Tabs
            swipeable
            scrollable
            defaultValue={tabIndex}
            onChange={setTabIndex}
            className={tabsBem('')}
            lineWidth={60}
          >
            {columnDataList.map((group, index) => {
              const groupActiveItemDisplay = group.selected?.[displayMember as 'label'];
              const panelTitle = (
                <span className={bem('tab-text', [{ unselected: !groupActiveItemDisplay }])}>
                  {groupActiveItemDisplay ?? locale!.unselectedTabText}
                </span>
              );

              return (
                <Tabs.Panel key={+index} title={panelTitle}>
                  <div className={bem('stack-content')}>
                    <Radio.Group
                      type="list"
                      listMarkerAlign="after"
                      value={currentValue[index]?.[valueMember as 'value']}
                      onChange={(v) => handleChange(v, index)}
                    >
                      {group.options.map((item, i) => {
                        const isActive =
                          currentValue[index] &&
                          currentValue[index][valueMember as 'value'] ===
                            item[valueMember as 'value'];
                        const label = handleItemRender(item);

                        return (
                          <Radio
                            key={`${label}${+i}`}
                            className={bem('stack-content-item', [
                              {
                                active: isActive,
                              },
                            ])}
                            value={item[valueMember as 'value']}
                          >
                            {label}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </div>
                </Tabs.Panel>
              );
            })}
          </Tabs>
        </div>
      </div>
    </Popup>
  );
});

StackPicker.displayName = 'StackPicker';

StackPicker.defaultProps = {
  displayMember: 'label',
  valueMember: 'value',
  visible: false,
  cols: Infinity,
  maskClosable: false,
};

export default memo(StackPicker);
