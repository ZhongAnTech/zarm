import { renderHook } from '@testing-library/react-hooks';
import { useUpdateEffect } from '../hooks';

describe('useUpdateEffect', () => {
  it('test on mounted', async () => {
    let mountedState = 0;
    const hook = renderHook(() =>
      useUpdateEffect(() => {
        mountedState = 1;
      }),
    );
    expect(mountedState).toEqual(0);
    hook.rerender();
    expect(mountedState).toEqual(1);
  });
});
