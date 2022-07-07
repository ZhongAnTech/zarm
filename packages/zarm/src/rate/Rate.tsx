import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { StarFill } from '@zarm-design/icons';
import { useDrag } from '@use-gesture/react';
import { ConfigContext } from '../n-config-provider';
import { useControllableValue } from '../utils/hooks';
import { getBoundingClientRect } from '../utils/dom';
import type { BaseRateProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface RateCssVars {
  '--size'?: number | string;
  '--color'?: React.CSSProperties['color'];
  '--active-color'?: React.CSSProperties['color'];
  '--gap'?: React.CSSProperties['marginRight'];
}

export type RateProps = BaseRateProps & HTMLProps;

const Rate = React.forwardRef<HTMLDivElement, RateProps>((props, ref) => {
  const { className, style, count, character, allowHalf, allowClear, readonly } = props;

  const [value, setValue] = useControllableValue<number>(props);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('rate', { prefixCls });

  const items = Array(count).fill(null);

  const getScoreRanges = () => {
    const ranges: { score: number; left: number }[] = [];
    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const rect = getBoundingClientRect(item);
      if (allowHalf) {
        ranges.push(
          { score: index + 0.5, left: rect.left },
          { score: index + 1, left: rect.left + rect.width / 2 },
        );
      } else {
        ranges.push({ score: index + 1, left: rect.left });
      }
    });

    return ranges;
  };

  const getScoreByPosition = (x: number) => {
    const ranges = getScoreRanges();
    for (let i = ranges.length - 1; i > 0; i--) {
      if (x > ranges[i].left) return ranges[i].score;
    }

    return allowHalf ? 0.5 : 1;
  };

  const render = (_, index: number) => {
    const score = index + 1;
    const checked = true;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (readonly) return;

      const next = getScoreByPosition(event.clientX);

      if (allowClear && value === next) {
        setValue(0);
        return;
      }

      setValue(allowHalf ? next : score);
    };

    const itemCls = bem('item', [
      {
        active: value >= index + 1,
        half: allowHalf && value === index + 0.5,
      },
    ]);

    return (
      <div
        key={index}
        ref={(element) => {
          itemRefs.current[index] = element;
        }}
        role="radio"
        tabIndex={0}
        className={itemCls}
        onClick={handleClick}
        aria-setsize={count}
        aria-posinset={score}
        aria-checked={checked}
      >
        <div className={bem('character__half')}>{character}</div>
        <div className={bem('character__full')}>{character}</div>
      </div>
    );
  };

  const cls = bem([{ readonly }, className]);

  const bind = useDrag(
    ({ values: [x] }) => {
      if (readonly) return;
      setValue(getScoreByPosition(x));
    },
    { pointer: { touch: true }, axis: 'x' },
  );
  return (
    <div ref={ref} role="radiogroup" tabIndex={0} className={cls} style={style} {...bind()}>
      {items.map(render)}
    </div>
  );
});

Rate.displayName = 'Rate';

Rate.defaultProps = {
  count: 5,
  defaultValue: 0,
  allowHalf: false,
  allowClear: false,
  character: <StarFill />,
};

export default Rate;
