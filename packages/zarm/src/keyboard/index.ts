import Keyboard from './Keyboard';
import ConfigReceiver from '../config-receiver';

export type { KeyboardProps } from './Keyboard';

export default ConfigReceiver('Keyboard')(Keyboard);
