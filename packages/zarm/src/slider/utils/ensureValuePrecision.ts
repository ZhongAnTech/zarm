import getClosestPoint from './getClosestPoint';
import getPrecision from './getPrecision';
import type PropsType from '../interface';

export default function ensureValuePrecision(
  val: number,
  props: Pick<PropsType, 'marks' | 'step' | 'min' | 'max'>,
) {
  const { step } = props;
  const closestPoint = Number.isFinite(getClosestPoint(val, props))
    ? getClosestPoint(val, props)
    : 0;
  return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step!)));
}
