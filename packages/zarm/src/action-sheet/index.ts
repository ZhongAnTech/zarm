import ActionSheet from './ActionSheet';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import showActionSheet from './show';

export type { ActionSheetProps } from './ActionSheet';

export default attachPropertiesToComponent(ActionSheet, {
  show: showActionSheet,
});
