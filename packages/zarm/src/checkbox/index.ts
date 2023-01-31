// import Checkbox from './Checkbox';
// import Group from './CheckboxGroup';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Group from './Group';
import Checkbox from './Item';

// export type { CheckboxProps, CheckboxCssVars } from './Checkbox';
// export type { CheckboxGroupProps, CheckboxGroupCssVars } from './CheckboxGroup';
export type { CheckboxGroupProps } from './Group';
export type { CheckboxCssVars, CheckboxProps } from './Item';

export default attachPropertiesToComponent(Checkbox, { Group });
