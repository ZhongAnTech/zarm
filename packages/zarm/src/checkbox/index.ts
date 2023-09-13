import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Checkbox from './Checkbox';
import Group from './CheckboxGroup';

export type { CheckboxProps, CheckboxRef } from './Checkbox';
export type { CheckboxGroupCssVars, CheckboxGroupProps } from './CheckboxGroup';
export type { CheckboxCssVars } from './interface';

export default attachPropertiesToComponent(Checkbox, { Group });
