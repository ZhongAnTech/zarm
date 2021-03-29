import type { MouseEvent } from 'react';
import preventDefault from '../../utils/preventDefault';

describe('preventDefault', () => {
  it('should pass', () => {
    const mEvent = { preventDefault: jest.fn() };
    preventDefault((mEvent as unknown) as MouseEvent);
    expect(mEvent.preventDefault).toBeCalledTimes(1);
  });
});
