import React, { useContext, forwardRef } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';


const Week = forwardRef<any, any>((_props, ref) => {
  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);
  const weeks = globalLocal?.Calendar?.weeks;
  const bem = createBEM('calendar', { prefixCls: globalPrefixCls });

  const content = weeks?.map((week) => (
    <li key={week} className={bem('bar__item')}>
      {week}
    </li>
  ));
  return (
    <ul className={bem('bar')} ref={ref}>
      {content}
    </ul>
  );
});

export default React.memo(Week);
