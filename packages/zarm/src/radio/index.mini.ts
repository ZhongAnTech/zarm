import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Radio from './Radio.mini';
import Group from './RadioGroup.mini';

export type { RadioCssVars, RadioProps, RadioRef } from './Radio.mini';
export type { RadioGroupCssVars, RadioGroupProps } from './RadioGroup.mini';

export default attachPropertiesToComponent(Radio, {
  Group,
});
