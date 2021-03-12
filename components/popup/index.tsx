import warnIfDeprecated from '../utils/warnIfDeprecated';
import Popup from './Popup';

export default warnIfDeprecated([{ oldProp: 'getContainer', newProp: 'mountContainer' }])(Popup);
