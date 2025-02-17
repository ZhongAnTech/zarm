import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import ActionSheet from './ActionSheet';
import { show } from './show';

export type { ActionSheetCssVars, ActionSheetProps } from './ActionSheet';
export type { ActionSheetItemProps } from './ActionSheetItem';

export default attachPropertiesToComponent(ActionSheet, { show });
