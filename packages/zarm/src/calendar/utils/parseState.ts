import dayjs from 'dayjs';

const parseState = (props: {
  min?: Date;
  max?: Date;
  value?: Date | Date[];
  defaultValue?: Date | Date[];
  mode: string;
  direction?: string;
}) => {
  const { defaultValue, mode, direction } = props;
  let { value } = props;

  let tmpValue: Date[];

  value = value || defaultValue;
  value = Array.isArray(value) ? value : ((value ? [value] : [new Date()]) as Date[]);

  tmpValue = value
    .map((item: Date) => dayjs(item).toDate())
    .sort((item1: Date, item2: Date) => +item1 - +item2);
  if (mode === 'range') {
    tmpValue = [tmpValue[0], tmpValue[tmpValue.length - 1]];
  }

  const min = props.min ? dayjs(props.min).toDate() : new Date();
  // const startMonth = dayjs(min).toDate();
  const max = props.max ? dayjs(props.max).toDate() : dayjs(min).add(1, 'year').toDate();

  // min、max 排序
  const duration = [min, max].sort((item1: Date, item2: Date) => +item1 - +item2);
  const steps = mode === 'range' ? 2 : 1;

  return {
    value: tmpValue,
    min: duration[0],
    max: duration[1],
    // 是否是入参更新(主要是月份跨度更新，需要重新定位)
    refresh: false,
    // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
    // steps:Math.max(tmp.value.length, tmp.defaultValue.length);
    steps,
    // 初始化点击步数
    mode,
    direction,
  };
};

export default parseState;
