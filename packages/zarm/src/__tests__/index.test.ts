import * as zarm from '..';

describe('index', () => {
  it('should expose the component and hook entry points', () => {
    expect(Object.keys(zarm)).toEqual(
      expect.arrayContaining([
        'Button',
        'ConfigProvider',
        'Modal',
        'Popup',
        'Toast',
        'useClickAway',
        'useInViewport',
        'useLongPress',
      ]),
    );
    expect(Object.values(zarm).every(Boolean)).toBe(true);
  });
});
