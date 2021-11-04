import * as React from 'react';
import classnames from 'classnames';
import { StarFill } from '@zarm-design/icons';
import { useDrag } from '@use-gesture/react';
import { ConfigContext } from '../n-config-provider';
import type { BaseRateProps } from './interface';
import { useControllableValue } from '../utils/hooks';
import { getBoundingClientRect } from '../utils/dom';

export interface RateProps extends BaseRateProps {
  className?: string;
  style?: React.CSSProperties;
}

const Rate = (props: RateProps) => {
  const { className, style, count, character, allowHalf, allowClear, readonly } = props;
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-rate`;
  const [value, setValue] = useControllableValue<number>(props);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

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

    return (
      <div
        key={index}
        ref={(element) => {
          itemRefs.current[index] = element;
        }}
        role="radio"
        tabIndex={0}
        className={`${prefixCls}__item`}
        onClick={handleClick}
        aria-setsize={count}
        aria-posinset={score}
        aria-checked={checked}
      >
        <div
          className={classnames(`${prefixCls}__character`, {
            [`${prefixCls}__character--active`]: value >= index + 1,
          })}
        >
          {character}
        </div>
        {allowHalf && (
          <div
            className={classnames(`${prefixCls}__character ${prefixCls}__character-half`, {
              [`${prefixCls}__character--active`]: value >= index + 0.5,
            })}
          >
            {character}
          </div>
        )}
      </div>
    );
  };

  const classes = classnames(
    prefixCls,
    {
      [`${prefixCls}--readonly`]: readonly,
    },
    className,
  );

  const bind = useDrag(
    ({ values: [x] }) => {
      if (readonly) return;
      setValue(getScoreByPosition(x));
    },
    { pointer: { touch: true }, axis: 'x' },
  );
  return (
    <div {...bind()} role="radiogroup" tabIndex={0} className={classes} style={style}>
      {items.map(render)}
    </div>
  );
};

Rate.displayName = 'Rate';

Rate.defaultProps = {
  count: 5,
  defaultValue: 0,
  allowHalf: false,
  allowClear: false,
  character: <StarFill />,
  touchable: true,
};

export default Rate;
