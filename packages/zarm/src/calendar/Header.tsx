import React, { useContext, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ArrowLeft, ArrowRight } from '@zarm-design/icons';
import dayjs from 'dayjs';
import useTitle from './useTitle';
import PickerView from '../picker-view';
import { ConfigContext } from '../n-config-provider';
import parseDataSource from './utils/parseDataSource';

interface HeaderProps {
  months: Date[];
  direction: 'vertical' | 'horizontal';
  currentMonth: number;
  changeMonth: Function;
}
function Header(props: HeaderProps) {
  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.Calendar;

  const bem = createBEM('calendar', { prefixCls: globalPrefixCls });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const { changeMonth, direction = 'vertical', months, currentMonth } = props;

  const current = months[currentMonth] || new Date();
  const title = useTitle(current);

  if (direction !== 'horizontal') {
    return null;
  }
  const dataSource = parseDataSource(months, locale);

  const currentValue = [current.getFullYear(), current.getMonth()];

  const dateChange = (value) => {
    const day = dayjs().year(value[0].value).month(value[1].value);
    const index = months.findIndex((i) => {
      return dayjs(i).isSame(day, 'month');
    });
    changeMonth(index);
  };

  return (
    <>
      <div className={bem('header')}>
        <div
          className={bem('title', [
            {
              animate: showDatePicker,
            },
          ])}
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {title}
          <ArrowRight theme="primary" size="sm" />
        </div>
        <div className={bem('action')}>
          <div className={bem('action-btn')}>
            <ArrowLeft
              theme="primary"
              className={bem('action-btn', [
                {
                  disabled: currentMonth === 0,
                },
              ])}
              onClick={() => {
                if (currentMonth > 0) {
                  changeMonth(currentMonth - 1);
                }
              }}
            />
          </div>
          <div className={bem('action-btn')}>
            <ArrowRight
              theme="primary"
              className={bem('action-btn', [
                {
                  disabled: currentMonth >= months.length - 1,
                },
              ])}
              onClick={() => {
                if (currentMonth < months.length - 1) {
                  changeMonth(currentMonth + 1);
                }
              }}
            />
          </div>
        </div>
      </div>
      {showDatePicker ? (
        <PickerView
          dataSource={Object.values(dataSource)}
          value={currentValue}
          onChange={dateChange}
        />
      ) : null}
    </>
  );
}
export default React.memo(Header);