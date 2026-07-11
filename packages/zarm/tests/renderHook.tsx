import { render } from '@testing-library/react';
import React from 'react';

export default function renderHook<Result>(callback: () => Result) {
  const result = { current: undefined as unknown as Result };

  const HookHarness = () => {
    result.current = callback();
    return null;
  };

  return {
    ...render(<HookHarness />),
    result,
  };
}
