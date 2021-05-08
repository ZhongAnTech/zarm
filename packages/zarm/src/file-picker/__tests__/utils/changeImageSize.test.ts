import changeImageSize from '../../utils/changeImageSize';

describe('changeImageSize', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should change image size', () => {
    const mCanvasRenderingContext2D = ({
      fillRect: jest.fn(),
      drawImage: jest.fn(),
      fillStyle: '',
    } as unknown) as CanvasRenderingContext2D;
    const mCanvas = ({
      getContext: jest.fn().mockReturnValueOnce(mCanvasRenderingContext2D),
      toDataURL: jest.fn().mockReturnValueOnce('data:,'),
      width: 0,
      height: 0,
    } as unknown) as HTMLCanvasElement;
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(mCanvas);
    const img = ({ width: 100, height: 200 } as unknown) as HTMLImageElement;
    const actual = changeImageSize(img, 0, 'image/png');
    expect(actual).toEqual('data:,');
    expect(createElementSpy).toBeCalledWith('canvas');
    expect(mCanvas.getContext).toBeCalledWith('2d');
    expect(mCanvasRenderingContext2D.fillRect).toBeCalledWith(0, 0, 100, 200);
    expect(mCanvasRenderingContext2D.drawImage).toBeCalledWith(img, 0, 0, 100, 200);
    expect(mCanvas.toDataURL).toBeCalledWith('image/png', 0);
  });

  it('should print error and return empty string if canvans context is null', () => {
    const mCanvas = ({
      getContext: jest.fn(),
    } as unknown) as HTMLCanvasElement;
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(mCanvas);
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'suppress error');
    const img = ({} as unknown) as HTMLImageElement;
    const actual = changeImageSize(img, 0, 'image/png');
    expect(actual).toEqual('');
    expect(createElementSpy).toBeCalledWith('canvas');
    expect(errorLogSpy).toBeCalledWith('请使用高版本浏览器，该版本浏览器不支持生成缩略图');
  });

  it('should print error if the quality is invalid', () => {
    const mCanvasRenderingContext2D = ({
      fillRect: jest.fn(),
      drawImage: jest.fn(),
      fillStyle: '',
    } as unknown) as CanvasRenderingContext2D;
    const mCanvas = ({
      getContext: jest.fn().mockReturnValueOnce(mCanvasRenderingContext2D),
      toDataURL: jest.fn().mockReturnValueOnce('data:,'),
      width: 0,
      height: 0,
    } as unknown) as HTMLCanvasElement;
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(mCanvas);
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'suppress error');
    const img = ({ width: 100, height: 200 } as unknown) as HTMLImageElement;
    const actual = changeImageSize(img, 2, 'image/png');
    expect(actual).toEqual('data:,');
    expect(createElementSpy).toBeCalledWith('canvas');
    expect(mCanvas.getContext).toBeCalledWith('2d');
    expect(mCanvasRenderingContext2D.fillRect).toBeCalledWith(0, 0, 100, 200);
    expect(mCanvasRenderingContext2D.drawImage).toBeCalledWith(img, 0, 0, 100, 200);
    expect(mCanvas.toDataURL).toBeCalledWith('image/png', 2);
    expect(errorLogSpy).toBeCalledWith('请输入有效的压缩比例, 没有将默认使用 0.92');
  });
});
