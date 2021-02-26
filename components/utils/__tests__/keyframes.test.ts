import { addKeyframe, existKeyframe, getKeyframe, removeKeyframe } from '../keyframes';

describe('keyframes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('#removeKeyframe', () => {
    it('should remove key frame from head element if it exists', () => {
      const div = document.createElement('div');
      const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValueOnce(div);
      const head = document.createElement('head');
      const docFragment = document.createDocumentFragment();
      docFragment.appendChild(head);
      const htmlCollection = docFragment.children;
      const getElementsByTagNameSpy = jest
        .spyOn(document, 'getElementsByTagName')
        .mockReturnValue(htmlCollection);
      const removeChildSpy = jest.spyOn(head, 'removeChild').mockImplementation();
      removeKeyframe('test');
      expect(getElementByIdSpy).toBeCalledWith('test');
      expect(getElementsByTagNameSpy).toBeCalledWith('head');
      expect(removeChildSpy).toBeCalledWith(div);
    });

    it('should do nothing if key frame does not exist', () => {
      const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValueOnce(null);
      const getElementsByTagNameSpy = jest.spyOn(document, 'getElementsByTagName');
      removeKeyframe('test');
      expect(getElementByIdSpy).toBeCalledWith('test');
      expect(getElementsByTagNameSpy).not.toBeCalled();
    });
  });

  describe('#addKeyframe', () => {
    it('should add key frame to head element', () => {
      const head = document.createElement('head');
      const docFragment = document.createDocumentFragment();
      docFragment.appendChild(head);
      const htmlCollection = docFragment.children;

      const style = ({} as unknown) as HTMLStyleElement;
      const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(style);
      const getElementsByTagNameSpy = jest
        .spyOn(document, 'getElementsByTagName')
        .mockReturnValueOnce(htmlCollection);
      const appendChildSpy = jest.spyOn(head, 'appendChild').mockImplementation();
      addKeyframe(
        'test',
        `0%, 100% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }`,
      );
      expect(createElementSpy).toBeCalledWith('style');
      expect(getElementsByTagNameSpy).toBeCalledWith('head');
      expect(appendChildSpy).toBeCalledWith({
        id: 'test',
        type: 'text/css',
        innerHTML: expect.any(String),
      });
      expect(style.innerHTML).toMatchInlineSnapshot(`
        "
          @-webkit-keyframes test {
            0%, 100% {
                  -webkit-transform: translate3d(0, 0, 0);
                  transform: translate3d(0, 0, 0);
                }
          }
          @keyframes test {
            0%, 100% {
                  -webkit-transform: translate3d(0, 0, 0);
                  transform: translate3d(0, 0, 0);
                }
          }
        "
      `);
    });

    describe('#getKeyframe', () => {
      it('should return key frame', () => {
        const keyframe = ({
          innerHTML: `
          @keyframes test {
              0%, 100% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
              }
          }`,
        } as unknown) as HTMLElement;
        const getElementByIdSpy = jest
          .spyOn(document, 'getElementById')
          .mockReturnValueOnce(keyframe);
        const actual = getKeyframe('test');
        expect(actual).toMatchInlineSnapshot(`
          "
                    @keyframes test {
                        0%, 100% {
                          -webkit-transform: translate3d(0, 0, 0);
                          transform: translate3d(0, 0, 0);
                        }
                    }"
        `);
        expect(getElementByIdSpy).toBeCalledWith('test');
      });

      it('should return null if keyframe does not exist', () => {
        const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValueOnce(null);
        expect(getKeyframe('test')).toBeNull();
        expect(getElementByIdSpy).toBeCalledWith('test');
      });
    });

    describe('#existKeyframe', () => {
      it('should return false if keyframe does not exist', () => {
        const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValueOnce(null);
        const actual = existKeyframe('test');
        expect(actual).toBeFalsy();
        expect(getElementByIdSpy).toBeCalledWith('test');
      });
      it('should return true if keyframe exist', () => {
        const keyframe = document.createElement('div');
        const getElementByIdSpy = jest
          .spyOn(document, 'getElementById')
          .mockReturnValueOnce(keyframe);
        const actual = existKeyframe('test');
        expect(actual).toBeTruthy();
        expect(getElementByIdSpy).toBeCalledWith('test');
      });
    });
  });
});
