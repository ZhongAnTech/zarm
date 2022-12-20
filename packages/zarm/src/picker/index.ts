import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Picker from './Picker';
import { prompt } from './prompt';

export type { PickerProps, PickerCssVars } from './Picker';

export { default as PickerContainer } from './Container';

export default attachPropertiesToComponent(Picker, { prompt });
