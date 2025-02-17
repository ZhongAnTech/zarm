import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Radio from './Radio';
import Group from './RadioGroup';

export type { RadioCssVars, RadioProps, RadioRef } from './Radio';
export type { RadioGroupCssVars, RadioGroupProps } from './RadioGroup';

export default attachPropertiesToComponent(Radio, {
  Group,
});
