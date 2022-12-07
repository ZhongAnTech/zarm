import Checkbox from './Checkbox';
import Group from './CheckboxGroup';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { CheckboxProps, CheckboxCssVars } from './Checkbox';
export type { CheckboxGroupProps, CheckboxGroupCssVars } from './CheckboxGroup';

export default attachPropertiesToComponent(Checkbox, { Group });
