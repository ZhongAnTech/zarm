import React, { useContext, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ArrowLeft, ArrowRight } from '@zarm-design/icons';
import dayjs from 'dayjs';
import PickerView from '../picker-view';
import { ConfigContext } from '../n-config-provider';
import parseDataSource from './utils/parseDataSource';

interface HeaderProps {
  months: Date[];
  currentMonth: number;
  changeMonth: Function;
}

function Header(props: HeaderProps) {
  const { prefixCls, locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.Calendar;

  const bem = createBEM('calendar', { prefixCls });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const { changeMonth, months, currentMonth } = props;

  const current = months[currentMonth] || new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  const title = dayjs().year(year).month(month).format(globalLocal?.Calendar?.yearMonthFormat);

  const dataSource = parseDataSource(months, locale);

  const currentValue = [year, month];

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
