import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Checkbox from './Checkbox';
import Group from './CheckboxGroup';

export type { CheckboxCssVars, CheckboxProps } from './Checkbox';
export type { CheckboxGroupCssVars, CheckboxGroupProps } from './CheckboxGroup';

export default attachPropertiesToComponent(Checkbox, { Group });
