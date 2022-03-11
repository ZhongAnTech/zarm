import { useContext } from 'react';
import { ConfigContext } from '../n-config-provider';

function useTitle(value: Date) {
  const { locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.Calendar;

  const year = value.getFullYear();
  const month = value.getMonth();

  return locale?.yearText === '年'
    ? year + locale.yearText + locale.months[month]
    : `${locale?.months[month]} ${year}`;
}

export default useTitle;
