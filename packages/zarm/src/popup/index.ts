import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import { clear, show } from './methods';
import Popup from './Popup';

export type { PopupShowProps } from './methods';
export type { PopupProps } from './Popup';

export default attachPropertiesToComponent(Popup, {
  show,
  clear,
});
