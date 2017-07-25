/**
 * Created by lvs on 2017/5/10.
 */

export default function getNearest(value, data) {
  const lens = data.length;
  if (lens === 1) {
    return data[0];
  }
  function loop(start, end) {
        // 体积小于3个 直接遍历
    if (end - start <= 2) {
      {
        let i = start;
        let min = data[i];
        for (; i <= end; i++) {
          if (Math.abs(value - data[i]) < Math.abs(value - min)) {
            min = data[i];
          }
        }
        return min;
      }
    }

        // 从中间取值 分别获得左边和右边的索引
    const right = Math.round((end - start) / 2) + start;
    const left = right - 1;

        // 计算两边的差值的绝对值;
    const abs_left_value = Math.abs(value - data[left]);
    const abs_right_value = Math.abs(value - data[right]);

        // 距离右边近
    if (abs_left_value > abs_right_value) {
      return loop(right, end);
    }
        // 距离左边近
    else if (abs_left_value < abs_right_value) {
      return loop(start, left);
    }
        // 两边一样

    return (data[right] == null) ? data[left] : data[right];
  }
  return loop(0, lens - 1);
}
