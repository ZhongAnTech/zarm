const domUtil = {
  // 获取元素的纵坐标（相对于窗口）
  getTop: (e) => {
    let offset = e.offsetTop;
    if (e.offsetParent != null) {
      offset += domUtil.getTop(e.offsetParent);
    }
    return offset;
  },

  // 获取元素的横坐标（相对于窗口）
  getLeft: (e) => {
    let offset = e.offsetLeft;
    if (e.offsetParent != null) {
      offset += domUtil.getLeft(e.offsetParent);
    }
    return offset;
  },

  probTouch: () => {
    return 'ontouchend' in document;
  },

  // 获取元素大小以及相对窗口的位置
  getBoundingClientRect: (e) => {
    const rect = e.getBoundingClientRect();

    // 解决ie下的兼容问题
    const isIE = navigator.userAgent.indexOf('MSIE') !== -1;
    const rectTop = isIE && e.tagName === 'HTML'
      ? -e.scrollTop
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
  setStyle: (e, styles) => {
    const isNumeric = (n) => {
      return (n !== '' && !Number.isNaN(parseFloat(n)) && Number.isFinite(n));
    };
    Object.keys(styles).forEach((prop) => {
      let unit = '';
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      e.style[prop] = styles[prop] + unit;
    });
  },

  // 获取元素css的某一个计算后属性值
  getStyleComputedProperty: (e, property: string): string => {
    const css = window.getComputedStyle(e, null);
    return css[property];
  },

  // 判断元素是否固定定位或者是否在固定定位元素内
  isFixed: (e) => {
    if (e === window.document.body) {
      return false;
    }
    if (domUtil.getStyleComputedProperty(e, 'position') === 'fixed') {
      return true;
    }
    return e.parentNode ? domUtil.isFixed(e.parentNode) : e;
  },

  // 获取元素完整尺寸(offset size + margin)
  getOuterSizes: (e) => {
    const _display = e.style.display;
    const _visibility = e.style.visibility;
    e.style.display = 'block';
    e.style.visibility = 'hidden';
    // const calcWidthToForceRepaint = e.offsetWidth;

    const styles = window.getComputedStyle(e);
    const x = parseFloat(styles.marginTop as string) + parseFloat(styles.marginBottom as string);
    const y = parseFloat(styles.marginLeft as string) + parseFloat(styles.marginRight as string);
    const result = {
      width: e.offsetWidth + y,
      height: e.offsetHeight + x,
    };

    // reset
    e.style.display = _display;
    e.style.visibility = _visibility;
    return result;
  },

  // 获取元素的offsetParent
  getOffsetParent: (e) => {
    const { offsetParent } = e;
    return offsetParent === window.document.body || !offsetParent ? window.document.documentElement : offsetParent;
  },

  // 获取指定元素可滚动的父元素
  getScrollParent(e) {
    const parent = e.parentNode;

    if (!parent) {
      return e;
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
    return domUtil.getScrollParent(e.parentNode);
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
  getScrollTopValue: (e) => {
    // tslint:disable-next-line
    return e === document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : e.scrollTop;
  },

  getScrollLeftValue: (e) => {
    return e === document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : e.scrollLeft;
  },
};

export default domUtil;
