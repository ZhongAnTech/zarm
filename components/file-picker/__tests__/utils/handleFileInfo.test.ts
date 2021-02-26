import { mocked } from 'ts-jest/utils';
import getFileDetail from '../../utils/getFileDetail';
import handleFileInfo from '../../utils/handleFileInfo';
import createThumbnail from '../../utils/createThumbnail';
import { flushMicroTasks } from '../../../../tests/utils';

jest.mock('../../utils/getFileDetail');
jest.mock('../../utils/createThumbnail');

const mockedGetFileDetail = mocked(getFileDetail);
const mockedCreateThumbnail = mocked(createThumbnail);

describe('file-picker', () => {
  describe('utils', () => {
    afterAll(() => {
      jest.resetAllMocks();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    describe('#handleFileInfo', () => {
      it('should get file detail if file is not a picture', () => {
        const file = new File(['foo'], 'foo.txt', {
          type: 'text/plain',
        });
        mockedGetFileDetail.mockReturnValueOnce({
          fileSize: 1000,
          fileType: 'zip',
          isPic: false,
          fileName: 'test',
        });
        const callback = jest.fn();
        handleFileInfo({ file, quality: 0.8 }, callback);
        expect(callback).toBeCalledWith({
          file,
          fileName: 'test',
          fileSize: 1000,
          fileType: 'zip',
          thumbnail: '',
        });
        expect(mockedGetFileDetail).toBeCalledWith(file);
      });

      it('should get file detail with thumbnail url', async () => {
        const file = new File(['foo'], 'foo.txt', {
          type: 'text/plain',
        });
        mockedGetFileDetail.mockReturnValueOnce({
          fileSize: 1000,
          fileType: 'jpg',
          isPic: true,
          fileName: 'avatar',
        });
        mockedCreateThumbnail.mockResolvedValueOnce('http://example.cdn.com');
        const callback = jest.fn();
        handleFileInfo({ file, quality: 0.8 }, callback);
        await flushMicroTasks();
        expect(callback).toBeCalledWith({
          file,
          fileName: 'avatar',
          fileSize: 1000,
          fileType: 'jpg',
          thumbnail: 'http://example.cdn.com',
        });
        expect(mockedGetFileDetail).toBeCalledWith(file);
      });

      it('should print error if create thumbnail fail', async () => {
        const file = new File(['foo'], 'foo.txt', {
          type: 'text/plain',
        });
        mockedGetFileDetail.mockReturnValueOnce({
          fileSize: 1000,
          fileType: 'jpg',
          isPic: true,
          fileName: 'avatar',
        });
        const err = new Error('memory leak');
        mockedCreateThumbnail.mockRejectedValueOnce(err);
        const callback = jest.fn();
        const errorLogStub = jest.spyOn(console, 'error').mockReturnValueOnce();
        handleFileInfo({ file, quality: 0.8 }, callback);
        await flushMicroTasks();
        expect(callback).not.toBeCalled();
        expect(mockedGetFileDetail).toBeCalledWith(file);
        expect(errorLogStub).toBeCalledWith(err);
      });
    });
  });
});
