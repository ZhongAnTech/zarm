import { renderHook } from '@testing-library/react-hooks';
import useSelect from '..';

describe('useSelect', () => {
  const setUp = (options): any => renderHook(() => useSelect(options));

  it('defaultValue should work', () => {
    const hook = setUp({ defaultValue: 1 });
    expect(hook.result.current[0]).toBe(1);
  });
});
