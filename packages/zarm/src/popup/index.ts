import Popup from './Popup';
import ConfigReceiver from '../config-receiver';

export type { PopupProps } from './Popup';

export default ConfigReceiver()(Popup);
