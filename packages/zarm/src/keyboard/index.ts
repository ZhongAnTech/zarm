import Keyboard from './Keyboard';
import type { KeyboardProps } from './Keyboard';
import ConfigReceiver from '../config-receiver';

export type { KeyboardProps };

export default ConfigReceiver('Keyboard')(Keyboard);
