import type PropsType from '../PropsType';

export default function getClosestPoint(
  val: number,
  { marks, step, min, max }: Pick<PropsType, 'marks' | 'step' | 'min' | 'max'>,
) {
  const points = Object.keys(marks || {}).map(parseFloat);
  if (step !== null) {
    const maxSteps = Math.floor((max - min) / step);
    const steps = Math.min((val - min) / step, maxSteps);
    const closestStep = Math.round(steps) * step + min;
    points.push(closestStep);
  }
  const diffs = points.map((point) => Math.abs(val - point));

  return points[diffs.indexOf(Math.min(...diffs))];
}
