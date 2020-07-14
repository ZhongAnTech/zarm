export type ContainerType = HTMLElement | (() => HTMLElement) | Window;

const domUtil = {
  // 获取元素的纵坐标（相对于窗口）
  getTop: (ele) => {
    let offset = ele.offsetTop;
    if (ele.offsetParent != null) {
      offset += domUtil.getTop(ele.offsetParent);
    }
    return offset;
  },

  // 获取元素的横坐标（相对于窗口）
  getLeft: (ele) => {
    let offset = ele.offsetLeft;
    if (ele.offsetParent != null) {
      offset += domUtil.getLeft(ele.offsetParent);
    }
    return offset;
  },

  probTouch: () => {
    return 'ontouchend' in document;
  },

  // 获取元素大小以及相对窗口的位置
  getBoundingClientRect: (ele) => {
    const rect = ele.getBoundingClientRect();

    // 解决ie下的兼容问题
    const isIE = navigator.userAgent.indexOf('MSIE') !== -1;
    const rectTop = isIE && ele.tagName === 'HTML'
      ? -ele.scrollTop
      : rect.top;

    return {
      left: rect.left,
      top: rectTop,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.right - rect.left,
      height: rect.bottom - rectTop,
    };
  },

  // 设置元素行内样式
  setStyle: (ele, styles) => {
    const isNumeric = (n) => {
      return (n !== '' && !Number.isNaN(parseFloat(n)) && Number.isFinite(n));
    };
    Object.keys(styles).forEach((prop) => {
      let unit = '';
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      ele.style[prop] = styles[prop] + unit;
    });
  },

  // 获取元素css的某一个计算后属性值
  getStyleComputedProperty: (ele, property: string): string => {
    const css = window.getComputedStyle(ele, null);
    return css[property];
  },

  // 判断元素是否固定定位或者是否在固定定位元素内
  isFixed: (ele) => {
    if (ele === window.document.body) {
      return false;
    }
    if (domUtil.getStyleComputedProperty(ele, 'position') === 'fixed') {
      return true;
    }
    return ele.parentNode ? domUtil.isFixed(ele.parentNode) : ele;
  },

  // 获取元素完整尺寸(offset size + margin)
  getOuterSizes: (ele) => {
    const _display = ele.style.display;
    const _visibility = ele.style.visibility;
    ele.style.display = 'block';
    ele.style.visibility = 'hidden';
    // const calcWidthToForceRepaint = e.offsetWidth;

    const styles = window.getComputedStyle(ele);
    const x = parseFloat(styles.marginTop as string) + parseFloat(styles.marginBottom as string);
    const y = parseFloat(styles.marginLeft as string) + parseFloat(styles.marginRight as string);
    const result = {
      width: ele.offsetWidth + y,
      height: ele.offsetHeight + x,
    };

    // reset
    ele.style.display = _display;
    ele.style.visibility = _visibility;
    return result;
  },

  // 获取元素的offsetParent
  getOffsetParent: (ele) => {
    const { offsetParent } = ele;
    return offsetParent === window.document.body || !offsetParent ? window.document.documentElement : offsetParent;
  },

  // 获取指定元素可滚动的父元素
  getScrollParent: (ele): HTMLElement => {
    const parent = ele.parentNode;

    if (!parent) {
      return ele;
    }
    if (parent === window.document) {
      if (window.document.body.scrollTop) {
        return window.document.body;
      }
      return window.document.documentElement;
    }
    if (
      ['scroll', 'auto'].indexOf(domUtil.getStyleComputedProperty(parent, 'overflow')) !== -1
      || ['scroll', 'auto'].indexOf(domUtil.getStyleComputedProperty(parent, 'overflow-x')) !== -1
      || ['scroll', 'auto'].indexOf(domUtil.getStyleComputedProperty(parent, 'overflow-y')) !== -1
    ) {
      return parent;
    }
    return domUtil.getScrollParent(ele.parentNode);
  },

  // 获取浏览器支持的带前缀属性名
  getSupportedPropertyName: (property) => {
    const prefixes = ['', 'ms', 'webkit', 'moz', 'o'];

    for (let i = 0; i < prefixes.length; i++) {
      const toCheck = prefixes[i] ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) : property;
      if (typeof window.document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  },

  // 获取元素scrollTop
  getScrollTop: (ele): number => {
    return ele === document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : ele.scrollTop;
  },

  getScrollLeft: (ele) => {
    return ele === document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : ele.scrollLeft;
  },

  getMountContainer: (mountContainer?: ContainerType): HTMLElement => {
    if (mountContainer) {
      if (typeof mountContainer === 'function') {
        return mountContainer();
      }
      if (
        typeof mountContainer === 'object'
        && mountContainer instanceof HTMLElement
      ) {
        return mountContainer;
      }
    }
    return document.body;
  },

  canUseDOM: () => !!(typeof window !== 'undefined' && window.document && window.document.createElement),

};

export default domUtil;
