import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Checkbox from './Checkbox.mini';
import Group from './CheckboxGroup';

export type { CheckboxCssVars, CheckboxProps, CheckboxRef } from './Checkbox';
export type { CheckboxGroupCssVars, CheckboxGroupProps } from './CheckboxGroup';

export default attachPropertiesToComponent(Checkbox, { Group });
