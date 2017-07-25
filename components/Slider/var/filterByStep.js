/**
 * Created by lvs on 2017/5/11.
 */
export default function filter(arr, step, getLast) {
  const filter_arr = [];

  if (!Array.isArray(arr)) {
    return filter_arr;
  }

  if (!+step || +step <= 1) {
    return arr;
  }

  const lens = arr.length - 1;
  const count = Math.floor(lens / step);
  let i = 0;
  let big_step = 0;
  for (; i <= count; i++) {
    big_step = i * step;
    console.log(big_step);
    filter_arr[i] = arr[i * step];
  }

    // 移动距离没到头
  if (big_step < lens && getLast) {
    filter_arr.push(arr[lens]);
  }
  return filter_arr;
}
