import getFileDetail from '../../utils/getFileDetail';

describe('getFileDetail', () => {
  it('should get image file detail', () => {
    const file = new File(['foo'], 'foo.png', { type: 'image/png' });
    const actual: ReturnType<typeof getFileDetail> = getFileDetail(file);
    expect(actual).toEqual({
      fileName: 'foo.png',
      fileSize: 3,
      fileType: 'image/png',
      isPic: true,
    });
  });

  it('should get image file type if file has no type property', () => {
    const file = new File(['foo'], 'foo.png');
    const actual: ReturnType<typeof getFileDetail> = getFileDetail(file);
    expect(actual).toEqual({ fileName: 'foo.png', fileSize: 3, fileType: 'png', isPic: false });
  });

  it('should get text file detail', () => {
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' });
    const actual: ReturnType<typeof getFileDetail> = getFileDetail(file);
    expect(actual).toEqual({
      fileName: 'foo.txt',
      fileSize: 3,
      fileType: 'text/plain',
      isPic: false,
    });
  });
});
