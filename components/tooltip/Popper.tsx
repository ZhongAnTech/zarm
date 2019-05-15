/* eslint-disable */
import domUtil from '../utils/dom';

const {
  getBoundingClientRect,
  getSupportedPropertyName,
  getOffsetParent,
  getOuterSizes,
  getScrollParent,
  isFixed,
  getScrollTopValue,
  getScrollLeftValue,
  setStyle,
  getStyleComputedProperty,
} = domUtil;

let root = {};
if (typeof window !== 'undefined') {
  root = window;
}

const DEFAULTS = {
  placement: 'bottom',
  offset: 0,
  boundariesPadding: 5,
  preventOverflowOrder: ['left', 'right', 'top', 'bottom'],
  modifiers: [
    'shift',
    'offset',
    'preventOverflow',
    'keepTogether',
    'arrow',
    'flip',
    'applyStyle',
  ],
  removeOnDestroy: false,
};

/**
 * 获取一个元素相对任意父元素的偏移值
 */
function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
  const elementRect = getBoundingClientRect(element);
  const parentRect = getBoundingClientRect(parent);

  if (fixed) {
    const scrollParent = getScrollParent(parent);
    parentRect.top += scrollParent.scrollTop;
    parentRect.bottom += scrollParent.scrollTop;
    parentRect.left += scrollParent.scrollLeft;
    parentRect.right += scrollParent.scrollLeft;
  }
  const rect = {
    top: elementRect.top - parentRect.top,
    left: elementRect.left - parentRect.left,
    bottom: elementRect.top - parentRect.top + elementRect.height,
    right: elementRect.left - parentRect.left + elementRect.width,
    width: elementRect.width,
    height: elementRect.height,
  };
  return rect;
}

/**
 * Helpers
 */

/**
 * 获取相反的方向
 */
function getOppositePlacement(placement) {
  const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, (matched) => {
    return hash[matched];
  });
}

/**
 * 生成气泡框的ClientRect
 */
function getPopperClientRect(popperOffsets) {
  const offsets = { ...popperOffsets };
  offsets.right = offsets.left + offsets.width;
  offsets.bottom = offsets.top + offsets.height;
  return offsets;
}

/**
 * 获取数组某个值的index
 */
function getArrayKeyIndex(arr, keyToFind) {
  let i = 0;
  let key;
  for (key in arr) {
    if (arr[key] === keyToFind) {
      return i;
    }
    i++;
  }
  return null;
}

/**
 * 检查是否是函数
 */
function isFunction(functionToCheck) {
  const getType = {};
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  );
}

/**
 * 获取一个元素的各个offset值
 */
function getOffsetRect(element) {
  type rect = {
    width: number,
    height: number,
    left: number,
    top: number,
    right?: number,
    bottom?: number,
  };
  const elementRect: rect = {
    width: element.offsetWidth,
    height: element.offsetHeight,
    left: element.offsetLeft,
    top: element.offsetTop,
  };
  elementRect.right = elementRect.left + elementRect.width;
  elementRect.bottom = elementRect.top + elementRect.height;

  return elementRect;
}

/**
 * @constructor 气泡框构造函数
 * @param {HTMLElement} reference
 * @param {HTMLElement} popper
 * @param {Object} options
 */
function Popper(reference, popper, options) {
  this._reference = reference;
  this._popper = popper;
  this.state = {};
  this._options = { ...DEFAULTS, ...options };
  this._options.modifiers = this._options.modifiers.map(
    (modifier) => {
      if (modifier === 'applyStyle') {
        this._popper.setAttribute('x-placement', this._options.placement);
      }
      return this.modifiers[modifier] || modifier;
    },
  );

  this.state.position = this._getPosition(this._popper, this._reference);
  setStyle(this._popper, { position: this.state.position, top: 0 });

  this.update();
  if ((root as Window).requestAnimationFrame) {
    requestAnimationFrame(this.update.bind(this));
  } else {
    setTimeout(this.update.bind(this));
  }
  this._setupEventListeners();
  // return this;
}

/**
 * 销毁
 */
Popper.prototype.destroy = function () {
  this._popper.removeAttribute('x-placement');
  this._popper.style.left = '';
  this._popper.style.position = '';
  this._popper.style.top = '';
  this._popper.style[getSupportedPropertyName('transform')] = '';
  this._removeEventListeners();

  if (this._options.removeOnDestroy) {
    this._popper.remove();
  }
  return this;
};

/**
 * 更新方位，重新计算偏移量
 */
Popper.prototype.update = function () {
  type dataType = {
    placement?: string,
    _originalPlacement?: string,
    offsets?: object,
    boundaries?: object,
  };
  let data: dataType = {};

  data.placement = this._options.placement;
  data._originalPlacement = this._options.placement;

  // 根据方位计算气泡框和reference相对气泡框定位父元素的left，top等值
  data.offsets = this._getOffsets(
    this._popper,
    this._reference,
    data.placement,
  );

  // 获取边界，用于优化在边界情况下正常显示气泡框
  data.boundaries = this._getBoundaries(data, this._options.boundariesPadding);

  // 运行各个modifier函数细调和修正偏移量，并最终应用样式
  data = this.runModifiers(data, this._options.modifiers);
};

/**
 * 判断气泡框应该使用什么定位
 */
Popper.prototype._getPosition = function (_, reference) {
  const isParentFixed = isFixed(reference);
  return isParentFixed ? 'fixed' : 'absolute';
  return 'absolute';
};

/**
 * 根据方位计算气泡框和reference相对气泡框定位父元素的left，top等值
 */
Popper.prototype._getOffsets = function (popper, reference, placement) {
  placement = placement.split('-')[0];
  type offset = {
    position?: string,
    top?: number,
    left?: number,
    width?: number,
    height?: number,
  };
  const popperOffsets: offset = {};

  popperOffsets.position = this.state.position;
  const isParentFixed = popperOffsets.position === 'fixed';

  // 根据方位计算reference相对气泡框定位父元素left, top等值
  const referenceOffsets = getOffsetRectRelativeToCustomParent(
    reference,
    getOffsetParent(popper),
    isParentFixed,
  );
  const popperRect = getOuterSizes(popper);

  if (['right', 'left'].indexOf(placement) !== -1) {
    popperOffsets.top =
      referenceOffsets.top +
      referenceOffsets.height / 2 -
      popperRect.height / 2;
    if (placement === 'left') {
      popperOffsets.left = referenceOffsets.left - popperRect.width;
    } else {
      popperOffsets.left = referenceOffsets.right;
    }
  } else {
    popperOffsets.left =
      referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
    if (placement === 'top') {
      popperOffsets.top = referenceOffsets.top - popperRect.height;
    } else {
      popperOffsets.top = referenceOffsets.bottom;
    }
  }
  popperOffsets.width = popperRect.width;
  popperOffsets.height = popperRect.height;

  return {
    popper: popperOffsets,
    reference: referenceOffsets,
  };
};

/**
 * 设置resize和scroll事件，更新气泡框位置
 */
Popper.prototype._setupEventListeners = function () {
  this.state.updateBound = this.update.bind(this);
  (root as Window).addEventListener('resize', this.state.updateBound);

  let target = getScrollParent(this._reference);
  if (
    target === (root as Window).document.body ||
    target === (root as Window).document.documentElement
  ) {
    target = root;
  }
  target.addEventListener('scroll', this.state.updateBound);
};

/**
 * 移除事件
 */
Popper.prototype._removeEventListeners = function () {
  (root as Window).removeEventListener('resize', this.state.updateBound);
  let target = getScrollParent(this._reference);

  if (
    target === (root as Window).document.body ||
    target === (root as Window).document.documentElement
  ) {
    target = root;
  }
  target.removeEventListener('scroll', this.state.updateBound);
  this.state.updateBound = null;
};

/**
 * 获取边界，用于优化在边界情况下正常显示气泡框
 */
Popper.prototype._getBoundaries = function (data, padding) {
  type boundary = {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
  };
  let boundaries: boundary = {};
  const offsetParent = getOffsetParent(this._popper);
  const scrollParent = getScrollParent(this._popper);
  const offsetParentRect = getOffsetRect(offsetParent);
  const scrollTop =
    data.offsets.popper.position === 'fixed'
      ? 0
      : getScrollTopValue(scrollParent);
  const scrollLeft =
    data.offsets.popper.position === 'fixed'
      ? 0
      : getScrollLeftValue(scrollParent);

  boundaries = {
    top: 0 - (offsetParentRect.top - scrollTop),
    right:
    (root as Window).document.documentElement.clientWidth -
      (offsetParentRect.left - scrollLeft),
    bottom:
    (root as Window).document.documentElement.clientHeight -
      (offsetParentRect.top - scrollTop),
    left: 0 - (offsetParentRect.left - scrollLeft),
  };

  boundaries.left += padding;
  boundaries.right! -= padding;
  boundaries.top += padding;
  boundaries.bottom! -= padding;

  return boundaries;
};

/**
 * 运行各个modifier函数细调和修正偏移量，并最终应用样式
 */
Popper.prototype.runModifiers = function (data, modifiers, ends) {
  let modifiersToRun = modifiers.slice();
  if (ends !== undefined) {
    modifiersToRun = this._options.modifiers.slice(
      0,
      getArrayKeyIndex(this._options.modifiers, ends),
    );
  }

  modifiersToRun.forEach(
    (modifier) => {
      if (isFunction(modifier)) {
        data = modifier.call(this, data);
      }
    },
  );

  return data;
};

/**
 * Modifiers list
 */
Popper.prototype.modifiers = {};

/**
 * 应用最后计算出的样式到气泡框
 */
Popper.prototype.modifiers.applyStyle = function (data) {
  const styles: { [propName: string]: number | string } = {
    position: data.offsets.popper.position,
  };
  const left = Math.round(data.offsets.popper.left);
  const top = Math.round(data.offsets.popper.top);

  let prefixedProperty;
  if (getSupportedPropertyName('transform')) {
    prefixedProperty = getSupportedPropertyName('transform');
    styles[prefixedProperty] = `translate3d(${left}px, ${top}px, 0)`;
    styles.top = 0;
    styles.left = 0;
  } else {
    styles.left = left;
    styles.top = top;
  }
  setStyle(this._popper, styles);

   // 给气泡框添加属性选择器，用于定位arrow
  this._popper.setAttribute('x-placement', data.placement);

  // 设置arrow定位样式
  if (data.offsets.arrow) {
    setStyle(data.arrowElement, data.offsets.arrow);
  }

  return data;
};

/**
 * 计算气泡框在不同方位的top，left值
 */
Popper.prototype.modifiers.shift = function (data) {
  const placement = data.placement;
  const basePlacement = placement.split('-')[0];
  const shiftVariation = placement.split('-')[1];

  if (shiftVariation) {
    const reference = data.offsets.reference;
    let popper = getPopperClientRect(data.offsets.popper);
    const shiftOffsets = {
      y: {
        start: { top: reference.top },
        end: { top: reference.top + reference.height - popper.height },
      },
      x: {
        start: { left: reference.left },
        end: { left: reference.left + reference.width - popper.width },
      },
    };
    const axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';

    data.offsets.popper = popper = {
      ...popper,
      ...shiftOffsets[axis][shiftVariation],
    };
  }

  return data;
};

/**
 * 阻止并修正在边界情况下气泡框溢出问题
 */
Popper.prototype.modifiers.preventOverflow = function (data) {
  const order = this._options.preventOverflowOrder;
  let popper = getPopperClientRect(data.offsets.popper);

  const check = {
    left() {
      let left = popper.left;
      if (popper.left < data.boundaries.left) {
        left = Math.max(popper.left, data.boundaries.left);
      }
      return { left };
    },
    right() {
      let left = popper.left;
      if (popper.right > data.boundaries.right) {
        left = Math.min(popper.left, data.boundaries.right - popper.width);
      }
      return { left };
    },
    top() {
      let top = popper.top;
      if (popper.top < data.boundaries.top) {
        top = Math.max(popper.top, data.boundaries.top);
      }
      return { top };
    },
    bottom() {
      let top = popper.top;
      if (popper.bottom > data.boundaries.bottom) {
        top = Math.min(popper.top, data.boundaries.bottom - popper.height);
      }
      return { top };
    },
  };

  order.forEach((direction) => {
    data.offsets.popper = popper = { ...popper, ...check[direction]() };
  });

  return data;
};

/**
 * 保持气泡框和reference始终在一起
 */
Popper.prototype.modifiers.keepTogether = function (data) {
  const popper = getPopperClientRect(data.offsets.popper);
  const reference = data.offsets.reference;
  const f = Math.floor;

  if (popper.right < f(reference.left)) {
    data.offsets.popper.left = f(reference.left) - popper.width;
  }
  if (popper.left > f(reference.right)) {
    data.offsets.popper.left = f(reference.right);
  }
  if (popper.bottom < f(reference.top)) {
    data.offsets.popper.top = f(reference.top) - popper.height;
  }
  if (popper.top > f(reference.bottom)) {
    data.offsets.popper.top = f(reference.bottom);
  }

  return data;
};

/**
 * 如果气泡框被边界挤得和reference重叠了，进行方向翻转
 */
Popper.prototype.modifiers.flip = function (data) {
  if (data.flipped && data.placement === data._originalPlacement) {
    // 两边都没空间，导致循环翻转
    return data;
  }

  let placement = data.placement.split('-')[0];
  let placementOpposite = getOppositePlacement(placement);
  const variation = data.placement.split('-')[1] || '';
  const flipOrder = [placement, placementOpposite];

  flipOrder.forEach(
    (step, index) => {
      if (placement !== step || flipOrder.length === index + 1) {
        return;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      const popperOffsets = getPopperClientRect(data.offsets.popper);
      const a = ['right', 'bottom'].indexOf(placement) !== -1;

      if (
        (a &&
          Math.floor(data.offsets.reference[placement]) >
            Math.floor(popperOffsets[placementOpposite])) ||
        (!a &&
          Math.floor(data.offsets.reference[placement]) <
            Math.floor(popperOffsets[placementOpposite]))
      ) {
        data.flipped = true;
        data.placement = flipOrder[index + 1];
        if (variation) {
          data.placement += `-${variation}`;
        }
        // 计算翻转后的偏移值
        data.offsets.popper = this._getOffsets(
          this._popper,
          this._reference,
          data.placement,
        ).popper;
        // 因为翻转了反向，重新跑一遍flip之前的modifiers
        data = this.runModifiers(data, this._options.modifiers, this._flip);
      }
    },
  );

  return data;
};

/**
 * 根据传入的offset对气泡框做偏移
 */
Popper.prototype.modifiers.offset = function (data) {
  const offset = this._options.offset;
  const popper = data.offsets.popper;

  if (data.placement.indexOf('left') !== -1) {
    popper.top -= offset;
  } else if (data.placement.indexOf('right') !== -1) {
    popper.top += offset;
  } else if (data.placement.indexOf('top') !== -1) {
    popper.left -= offset;
  } else if (data.placement.indexOf('bottom') !== -1) {
    popper.left += offset;
  }

  return data;
};

/**
 * 保证箭头永远在气泡框和reference之间
 */
Popper.prototype.modifiers.arrow = function (data) {
  const arrow = this._popper.querySelector(this._options.arrowElement);
  const arrowStyle = {};
  const placement = data.placement.split('-')[0];
  const placement1 = data.placement.split('-')[1];
  const popper = getPopperClientRect(data.offsets.popper);
  const reference = data.offsets.reference;
  const isVertical = ['left', 'right'].indexOf(placement) !== -1;
  const len = isVertical ? 'height' : 'width';
  const side = isVertical ? 'top' : 'left';
  const altSide = isVertical ? 'left' : 'top';
  const opSide = isVertical ? 'bottom' : 'right';
  const arrowSize = getOuterSizes(arrow)[len];
  const offsetSize = parseFloat (getStyleComputedProperty(this._popper, 'paddingLeft'));
  const hash = {
    start: reference[side] + offsetSize,
    center: reference[side] + reference[len] / 2 - arrowSize / 2,
    end: reference[opSide] - offsetSize - arrowSize,
  };

  if (reference[opSide] - arrowSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
  }
  if (reference[side] + arrowSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowSize - popper[opSide];
  }

  const place = hash[placement1 || 'center'];
  let sideValue = place - popper[side];

  arrowStyle[side] = Math.floor(sideValue);
  arrowStyle[altSide] = '';

  data.offsets.arrow = arrowStyle;
  data.arrowElement = arrow;

  return data;
};

export default Popper;
