/*
 * @Author: your name
 * @Date: 2021-11-01 17:08:11
 * @LastEditTime: 2021-11-01 19:20:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zarm/packages/zarm/src/address-anchor/index.tsx
 */
import React, { useRef } from 'react';
import cn from 'classnames';
import BaseProps from './PropsType';
import { ConfigContext } from '../n-config-provider';

export interface AddressAnchorProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}

const AddressAnchor: React.FC<AddressAnchorProps> = (props) => {
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-address-anchor`;

  const { className, value = [], initialKey = 'initialKey', key = 'key', ItemComponent } = props;
  const curEnum = useRef('');

  const getKeyList = (list: Array<object>) => {
    if (Array.isArray(list)) {
      const result = [
        ...new Set(list.map((item: any) => (item?.[initialKey] || '').charAt(0).toUpperCase())),
      ];
      return result;
    }
    return [];
  };

  const scrollToAnchor = (id: string) => {
    const target: any = document.getElementById(id) || {
      parentNode: {
        scrollTop: '',
        offsetTop: '',
      },
      offsetTop: '',
    };
    if (target) {
      target.parentNode.scrollTop = target.offsetTop - target?.parentNode?.offsetTop;
    }
  };

  return (
    <>
      <div className={cn(prefixCls, className)} style={{ height: '100%' }}>
        <div className={`${prefixCls}__container`}>
          <div className={`${prefixCls}__each-enum`}>
            {value?.map((item: any, index: any) => {
              let cz = (item.customerPinyin || '')?.charAt(0);
              cz = cz?.toUpperCase();
              if (cz !== curEnum.current) {
                curEnum.current = cz;
                return (
                  <>
                    <div key={item[key] || index} id={'za_address_anchor_' + curEnum.current}>
                      <div className={`${prefixCls}__title`}>{cz}</div>
                    </div>
                    <div key={item?.[key] || index}>
                      <ItemComponent item={item} />
                    </div>
                  </>
                );
              }
              return (
                <div key={item?.[key] || index}>
                  <ItemComponent item={item} />
                </div>
              );
            })}
          </div>
          <div className={`${prefixCls}__cus-key`}>
            <p>
              {getKeyList(value).map((item) => {
                return (
                  <span
                    key={item}
                    onClick={(e: any) => {
                      scrollToAnchor('za_address_anchor_' + item);
                      e.stopPropagation();
                    }}
                    className={`${prefixCls}__alphabet-item`}
                  >
                    {item}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressAnchor;
