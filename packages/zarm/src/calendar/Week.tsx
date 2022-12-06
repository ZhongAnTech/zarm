import React, { useContext, forwardRef } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';

const Week = forwardRef<any, any>((_props, ref) => {
  const { prefixCls, locale: globalLocal } = useContext(ConfigContext);
  const weeks = globalLocal?.Calendar?.weeks;
  const bem = createBEM('calendar', { prefixCls });

  const content = weeks?.map((week) => <li key={week}>{week}</li>);
  return (
    <ul className={bem('week')} ref={ref}>
      {content}
    </ul>
  );
});

export default React.memo(Week);
