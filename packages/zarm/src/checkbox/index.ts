import Checkbox from './Checkbox';
import Group from './CheckboxGroup';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { CheckboxProps } from './Checkbox';
export type { CheckboxGroupProps } from './CheckboxGroup';

export default attachPropertiesToComponent(Checkbox, {
  Group,
});
