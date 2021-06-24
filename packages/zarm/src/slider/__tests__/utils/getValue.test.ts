import getValue from '../../utils/getValue';

describe('getValue', () => {
  it('should return props.value if it exists', () => {
    const actual = getValue({ value: 1 }, 0);
    expect(actual).toEqual(1);
  });

  it('should return props.defaultValue if it exists', () => {
    const actual = getValue({ defaultValue: 1 }, 0);
    expect(actual).toEqual(1);
  });

  it("should return default value if props.value and props.defaultValue don't exist", () => {
    const actual = getValue({}, 1);
    expect(actual).toEqual(1);
  });

  it('should return default value if props.defaultValue is 0', () => {
    const actual = getValue({ defaultValue: 0 }, 1);
    expect(actual).toEqual(1);
  });
});
