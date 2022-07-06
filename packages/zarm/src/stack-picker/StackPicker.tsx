import React, {
  useEffect,
  MouseEvent,
  useState,
  ReactNode,
  useCallback,
  memo,
  useMemo,
} from 'react';
import classnames from 'classnames';
import Popup from '../popup';
import Actions from './Actions';
import PropsType, { TDataSource, IDataSource } from './PropsType';

const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
};

export interface StackPickerProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default memo(
  ({
    prefixCls = 'za-stack-picker',
    className,
    dataSource,
    defaultValue,
    value,
    displayMember = 'label',
    valueMember = 'value',
    title = '请选择',
    visible = false,
    cols = Infinity,
    labelAddon = ' > ',
    displayRender,
    itemRender = (data: TDataSource) => data[displayMember as 'label'],
    onChangeValidate,
    cancelText,
    okText,
    onChange,
    onOk,
    onCancel,
    maskClosable = false,
    locale,
  }: StackPickerProps) => {
    const [errorMsg, setErrorMsg] = useState<ReactNode>('');
    const [currentValue, setCurrentValue] = useState<IDataSource[]>([]);
    const [currentVisible, setCurrentVisible] = useState(visible);

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
      const group: typeof dataSource[] = [];
      let _dataSource: typeof dataSource | null = dataSource;
      let i = 0;
      while (_dataSource) {
        group.push(_dataSource);

        const colVal = currentValue[i];
        const childrenData: typeof dataSource | undefined = (
          (colVal
            ? handleObtainItem(_dataSource, colVal[valueMember as keyof ReactNode])
            : _dataSource[0]) || {}
        ).children;

        if (childrenData && childrenData.length && i < cols - 1) {
          _dataSource = childrenData;
        } else {
          _dataSource = null;
        }

        i += 1;
      }

      return group;
    }, [cols, currentValue, dataSource, handleObtainItem, valueMember]);

    /**
     * 修改列表值
     * @param e
     * @param index
     * @param item
     */
    const handleChange = (e: MouseEvent, index?: number, item?: IDataSource) => {
      stopPropagation(e);

      const _value = currentValue.slice(0, index);

      if (item && typeof index === 'number') {
        _value[index] = item;
      }

      setCurrentValue(_value);

      if (onChangeValidate) {
        if (typeof onChangeValidate !== 'function') {
          console.error('onChangeValidate need a function');
        } else {
          const _errorMsg = onChangeValidate(value);
          setErrorMsg(_errorMsg);
        }
      }

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
      if (onOk) {
        if (typeof onOk !== 'function') {
          console.error('onOk need a function');
        } else {
          onOk(currentValue.map((v) => v![valueMember as 'value']));
        }
      }
    };

    /**
     * 判断是否有传入 itemRender， 否则使用默认的渲染方式
     * @param item
     */
    const handleItemRender = (item: TDataSource) => {
      return itemRender(item);
    };

    /**
     * 判断是否有传入 displayRender， 否则使用默认的渲染方式展示选择内容
     */
    const handleDisplayRender = () => {
      const _currentValue = currentValue.map(({ children, ...others }) => others);

      if (displayRender) {
        if (typeof displayRender !== 'function') {
          console.error('displayRender need a function');

          // 因为报错返回一个空字符串
          return '';
        }

        return displayRender(_currentValue);
      }

      return _currentValue.map((item) => handleItemRender(item)).join(labelAddon);
    };

    return (
      <Popup visible={currentVisible} onMaskClick={handleMaskClick} direction="bottom">
        <div className={classnames(prefixCls, className)}>
          <div className={`${prefixCls}__container`}>
            <div className={`${prefixCls}__wrapper`}>
              <Actions
                {...{
                  prefixCls,
                  cancelText,
                  okText,
                  title,
                  handleCancel,
                  handleOk,
                  locale,
                }}
              />

              <div className={`${prefixCls}__crumbs`}>
                <p>选择：{handleDisplayRender()}</p>

                {errorMsg && <p className={`${prefixCls}__crumbs-error`}>{errorMsg}</p>}
              </div>

              <div className={`${prefixCls}__group`}>
                {columnDataList.map((group, index) => {
                  const columnClass = classnames(`${prefixCls}__stack-column`, {
                    [`${prefixCls}__stack-column--hidden`]:
                      !currentValue[index] || !currentValue[index][valueMember as 'value'],
                  });

                  return (
                    <div
                      className={columnClass}
                      key={+index}
                      onClick={(e: MouseEvent<HTMLDivElement>) => handleChange(e, index - 1)}
                    >
                      <div
                        className={`${prefixCls}__stack-column-wrapper`}
                        onClick={(e) => stopPropagation(e)}
                      >
                        {group.map((item, i) => {
                          const isActive =
                            currentValue[index] &&
                            currentValue[index][valueMember as 'value'] ===
                              item[valueMember as 'value'];

                          const columnItemClass = classnames(`${prefixCls}__stack-column-item`, {
                            [`${prefixCls}__stack-column-item--active`]: isActive,
                          });

                          const label = handleItemRender(item);

                          return (
                            <div
                              key={`${label}${+i}`}
                              className={columnItemClass}
                              onClick={(e) => handleChange(e, index, item)}
                            >
                              {label}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Popup>
    );
  },
);
