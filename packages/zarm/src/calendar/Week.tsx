import React, { useContext } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';

interface WeekProps {
  weekStartsOn?: 'Monday' | 'Sunday';
}
function Week({ weekStartsOn }: WeekProps) {
  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.Calendar;

  const weeks = [...locale!.weeks];
  const bem = createBEM('calendar', { prefixCls: globalPrefixCls });

  if (weekStartsOn === 'Monday') {
    weeks.push(weeks.shift()!);
  }
  const content = weeks.map((week) => (
    <li key={week} className={bem('bar__item')}>
      {week}
    </li>
  ));
  return <ul className={bem('bar')}>{content}</ul>;
}

Week.defaultProps = {
  weekStartsOn: 'Sunday',
};
export default React.memo(Week);
