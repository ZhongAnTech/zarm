import Radio from './Radio';
import Group from './RadioGroup';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { RadioProps, RadioCssVars } from './Radio';
export type { RadioGroupProps, RadioGroupCssVars } from './RadioGroup';

export default attachPropertiesToComponent(Radio, {
  Group,
});
