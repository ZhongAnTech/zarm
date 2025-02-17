import dayjs from 'dayjs';

const parseState = (props: {
  value?: Date | Date[];
  defaultValue?: Date | Date[];
  mode: string;
}) => {
  const { defaultValue, mode } = props;
  let { value } = props;

  let tmpValue: Date[];

  value = value || defaultValue;
  value = Array.isArray(value) ? value : ((value ? [value] : []) as Date[]);

  tmpValue = value
    .map((item: Date) => dayjs(item).toDate())
    .sort((item1: Date, item2: Date) => +item1 - +item2);
  if (mode === 'range') {
    tmpValue = [tmpValue[0], tmpValue[tmpValue.length - 1]];
  }
  return {
    value: tmpValue,
  };
};

export default parseState;
