import DateTool from '../../utils/date';

const parseState = (props: {
  min?: Date;
  max?: Date;
  value?: Date | Date[];
  defaultValue?: Date | Date[];
  mode: string;
  direction: string;
}) => {
  const { defaultValue, mode, direction } = props;
  let { value } = props;

  let tmpValue!: Date[];

  value = value || defaultValue;
  value = (Object.prototype.toString.call(value) === '[object Array]'
    ? value
    : (value && [value]) || []) as Date[];

  // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
  // tmpValue = value.map(item => DateTool.parseDay(item));
  tmpValue = value.map((item: Date) => DateTool.parseDay(item));
  // 排序过滤
  tmpValue = tmpValue!.sort((item1: Date, item2: Date) => +item1 - +item2);
  if (mode === 'range') {
    tmpValue = [tmpValue[0], tmpValue[tmpValue.length - 1]];
  }
  const min = props.min ? DateTool.parseDay(props.min) : new Date();
  const startMonth = DateTool.cloneDate(min, 'dd', 1);
  const max = props.max ? DateTool.parseDay(props.max) : DateTool.cloneDate(min, 'y', 1);
  const endMonth = DateTool.cloneDate(max, 'dd', DateTool.getDaysByDate(max));

  // min、max 排序
  const duration = [min, max].sort((item1: Date, item2: Date) => +item1 - +item2);
  let steps = mode === 'single' ? 1 : 2;
  if (mode === 'multiple') {
    steps = Number.MAX_VALUE;
  }
  const tmp = {
    value: tmpValue,
    min: duration[0],
    max: duration[1],
    startMonth,
    endMonth,
    // 是否是入参更新(主要是月份跨度更新，需要重新定位)
    refresh: false,
    // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
    // steps:Math.max(tmp.value.length, tmp.defaultValue.length);
    steps,
    // 初始化点击步数
    mode,
    direction,
  };

  return tmp;
};

export default parseState;
