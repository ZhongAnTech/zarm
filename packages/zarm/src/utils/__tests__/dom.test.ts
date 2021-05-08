import {
  getTop,
  getLeft,
  getBoundingClientRect,
  setStyle,
  getStyleComputedProperty,
  isFixed,
} from '../dom';

describe('utils', () => {
  describe('dom', () => {
    describe('#getTop', () => {
      it('should get offset top of a HTML element', () => {
        const testElement = ({ offsetTop: 100, offsetParent: null } as unknown) as HTMLElement;
        const actual = getTop(testElement);
        expect(actual).toEqual(100);
      });
      it('should get offset top recursively', () => {
        const testElement = ({
          offsetTop: 100,
          offsetParent: { offsetTop: 50 },
        } as unknown) as HTMLElement;
        const actual = getTop(testElement);
        expect(actual).toEqual(150);
      });
    });
    describe('#getLeft', () => {
      it('should get offset left of a HTML element', () => {
        const testElement = ({ offsetLeft: 100, offsetParent: null } as unknown) as HTMLElement;
        const actual = getLeft(testElement);
        expect(actual).toEqual(100);
      });
      it('should get offset left recursively', () => {
        const testElement = ({
          offsetLeft: 100,
          offsetParent: { offsetLeft: 50 },
        } as unknown) as HTMLElement;
        const actual = getLeft(testElement);
        expect(actual).toEqual(150);
      });
    });
    describe('#getBoundingClientRect', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('should get bounding client rect for modern browser', () => {
        const testElement = ({
          getBoundingClientRect: jest
            .fn()
            .mockReturnValueOnce({ top: 10, left: 9, right: 19, bottom: 20 }),
        } as unknown) as Element;
        const userAgentSpy = jest
          .spyOn(navigator, 'userAgent', 'get')
          .mockReturnValueOnce('Mozilla/5.0');
        const actual = getBoundingClientRect(testElement);
        expect(actual).toEqual({ left: 9, top: 10, right: 19, bottom: 20, width: 10, height: 10 });
        expect(testElement.getBoundingClientRect).toBeCalledTimes(1);
        expect(userAgentSpy).toBeCalledTimes(1);
      });

      it('should get bounding client rect for IE browser', () => {
        const testElement = ({
          tagName: 'HTML',
          scrollTop: -10,
          getBoundingClientRect: jest.fn().mockReturnValueOnce({ left: 9, right: 19, bottom: 20 }),
        } as unknown) as Element;
        const userAgentSpy = jest
          .spyOn(navigator, 'userAgent', 'get')
          .mockReturnValueOnce(
            'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Tablet PC 2.0; .NET4.0E; .NET4.0C)',
          );
        const actual = getBoundingClientRect(testElement);
        expect(actual).toEqual({ left: 9, top: 10, right: 19, bottom: 20, width: 10, height: 10 });
        expect(testElement.getBoundingClientRect).toBeCalledTimes(1);
        expect(userAgentSpy).toBeCalledTimes(1);
      });
    });
    describe('#setStyle', () => {
      it('should set style correctly', () => {
        const testElement = ({ style: {} } as unknown) as HTMLElement;
        setStyle(testElement, { color: 'red', width: 100, height: 100 });
        expect(testElement.style).toEqual({ color: 'red', width: '100px', height: '100px' });
      });
    });
    describe('#getStyleComputedProperty', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('should get style computed property', () => {
        const testElement = ({} as unknown) as Element;
        const computedStyle = ({ border: '1px solid #ddd' } as unknown) as CSSStyleDeclaration;
        const getComputedStyleSpy = jest
          .spyOn(window, 'getComputedStyle')
          .mockReturnValueOnce(computedStyle);
        const actual = getStyleComputedProperty(testElement, 'border');
        expect(actual).toEqual('1px solid #ddd');
        expect(getComputedStyleSpy).toBeCalledWith({}, null);
      });
    });
    describe('#isFixed', () => {
      afterEach(() => {
        jest.restoreAllMocks();
      });
      it('should return false if the element is document.body', () => {
        const actual = isFixed(window.document.body);
        expect(actual).toBeFalsy();
      });
      it('should return true if the position of the element is "fixed"', () => {
        const computedStyle = ({ position: 'fixed' } as unknown) as CSSStyleDeclaration;
        const getComputedStyleSpy = jest
          .spyOn(window, 'getComputedStyle')
          .mockReturnValueOnce(computedStyle);
        const actual = isFixed(({} as unknown) as Element);
        expect(actual).toBeTruthy();
        expect(getComputedStyleSpy).toBeCalledWith({}, null);
      });
      it('should return false if parent node is body', () => {
        const ele = { parentNode: window.document.body };
        const computedStyle = ({ position: 'absolute' } as unknown) as CSSStyleDeclaration;
        const getComputedStyleSpy = jest
          .spyOn(window, 'getComputedStyle')
          .mockReturnValueOnce(computedStyle);
        const actual = isFixed((ele as unknown) as Element);
        expect(actual).toBeFalsy();
        expect(getComputedStyleSpy).toBeCalledTimes(1);
      });

      it('should return false if ele has no parent node and is not fixed', () => {
        const computedStyle = ({ position: 'absolute' } as unknown) as CSSStyleDeclaration;
        const getComputedStyleSpy = jest
          .spyOn(window, 'getComputedStyle')
          .mockReturnValueOnce(computedStyle);
        const ele = ({} as unknown) as Element;
        const actual = isFixed(ele);
        expect(actual).toBeFalsy();
        expect(getComputedStyleSpy).toBeCalledTimes(1);
      });
    });
  });
});
