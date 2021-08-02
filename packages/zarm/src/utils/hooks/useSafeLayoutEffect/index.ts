import * as React from 'react';
import { canUseDOM } from '../../dom';

const useSafeLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;

export default useSafeLayoutEffect;
