import isImage from '../../utils/isImage';

describe('isImage', () => {
  it.each`
    mime                          | expected
    ${'image/gif'}                | ${true}
    ${'image/png'}                | ${true}
    ${'image/jpeg'}               | ${true}
    ${'image/bmp'}                | ${true}
    ${'image/webp'}               | ${true}
    ${'image/x-icon'}             | ${true}
    ${'image/vnd.microsoft.icon'} | ${true}
    ${'text/plain'}               | ${false}
    ${'text/html'}                | ${false}
    ${'text/css'}                 | ${false}
    ${'text/javascript'}          | ${false}
    ${'audio/midi'}               | ${false}
    ${'video/webm'}               | ${false}
  `('$mime is image: $expected', ({ mime, expected }) => {
    expect(isImage(mime)).toEqual(expected);
  });
});
