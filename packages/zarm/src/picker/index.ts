import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Picker from './Picker';
import { prompt } from './prompt';

export { default as PickerContainer } from './Container';
export type { PickerCssVars, PickerProps } from './Picker';

export default attachPropertiesToComponent(Picker, { prompt });
