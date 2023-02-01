import { renderHook } from '@testing-library/react-hooks';
import useControllableValue from '../hooks/useControllableValue';

describe('useUpdateEffect', () => {
  const render = (props, options?: any): any => renderHook(() => useControllableValue(props, options));
  it('defaultValue', async () => {
    const hook  = render({ defaultValue: 1 });
    expect(hook.result.current[0]).toEqual(1);
  });

  it('state update', () => {
    const props: any = {
      value: 0,
    };
    const { result, rerender } = render(props);
    props.value = 1;
    rerender(props);
    expect(result.current[0]).toEqual(1);
  });
});