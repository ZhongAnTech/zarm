import { mocked } from 'ts-jest/utils';
import createThumbnail from '../../utils/createThumbnail';
import changeImageSize from '../../utils/changeImageSize';
import { mockCreateObjectURL, mockResetCreateObjectURL } from '../../../../tests/utils';

jest.mock('../../utils/changeImageSize');

const mChangeImageSize = mocked(changeImageSize);

describe('createThumbnail', () => {
  let imageOnload: Function | undefined;
  const mCreateObjectURL = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
    mockResetCreateObjectURL();
  });
  beforeAll(() => {
    Object.defineProperty(Image.prototype, 'onload', {
      get() {
        return this._onload;
      },
      set(fn) {
        imageOnload = fn;
        this._onload = fn;
      },
    });
    mockCreateObjectURL(mCreateObjectURL);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  it('should create thumbnail for image', async () => {
    mChangeImageSize.mockReturnValueOnce('data:,');
    const createElementSpy = jest.spyOn(document, 'createElement');
    const mFile = new File(['foo'], 'foo.png', { type: 'image/png' });
    const createThumbnailPromise = createThumbnail({
      file: mFile,
      quality: 0,
      fileType: 'image/png',
      maxWidth: 100,
    });
    imageOnload!();
    const actual = await createThumbnailPromise;
    expect(actual).toEqual('data:,');
    expect(createElementSpy).toBeCalledWith('img');
    expect(mChangeImageSize).toBeCalledWith(expect.any(Image), 0, 'image/png');
    expect(window.URL.createObjectURL).toBeCalledWith(mFile);
  });

  it('should return image url get from src if quality, maxWidth, maxHeight are falsy value', async () => {
    mCreateObjectURL.mockReturnValueOnce('./test.png');
    const createElementSpy = jest.spyOn(document, 'createElement');
    const mFile = new File(['foo'], 'foo.png', { type: 'image/png' });
    const createThumbnailPromise = createThumbnail({
      file: mFile,
      quality: 0,
      fileType: 'image/png',
    });
    imageOnload!();
    const actual = await createThumbnailPromise;
    expect(createElementSpy).toBeCalledWith('img');
    expect(mChangeImageSize).not.toBeCalled();
    expect(actual).toEqual(`${window.location.href}test.png`);
  });
});
