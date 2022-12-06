import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Toast from './Toast';
import { show } from './methods';

export type { ToastProps } from './Toast';

export default attachPropertiesToComponent(Toast, { show });
