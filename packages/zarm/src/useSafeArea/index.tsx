import useCSSVar from '../useCSSVar';

const ZARM_SAFE_AREA_INSET_TOP = '--zarm-safe-area-inset-top';
const ZARM_SAFE_AREA_INSET_RIGHT = '--zarm-safe-area-inset-right';
const ZARM_SAFE_AREA_INSET_BOTTOM = '--zarm-safe-area-inset-bottom';
const ZARM_SAFE_AREA_INSET_LEFT = '--zarm-safe-area-inset-left';

export {
  ZARM_SAFE_AREA_INSET_TOP,
  ZARM_SAFE_AREA_INSET_RIGHT,
  ZARM_SAFE_AREA_INSET_BOTTOM,
  ZARM_SAFE_AREA_INSET_LEFT,
};

export const useSafeArea = () => {
  const { getCSSVar, setCSSVar } = useCSSVar();
  const safeAreaInset = [
    getCSSVar(ZARM_SAFE_AREA_INSET_TOP),
    getCSSVar(ZARM_SAFE_AREA_INSET_RIGHT),
    getCSSVar(ZARM_SAFE_AREA_INSET_BOTTOM),
    getCSSVar(ZARM_SAFE_AREA_INSET_LEFT),
  ];
  return { safeAreaInset, setCSSVar };
};

export default useSafeArea;
