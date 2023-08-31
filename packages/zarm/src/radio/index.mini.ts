import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Radio from './Radio.mini';
import Group from './RadioGroup';

export type { RadioCssVars, RadioProps, RadioRef } from './Radio.mini';
export type { RadioGroupCssVars, RadioGroupProps } from './RadioGroup';

export default attachPropertiesToComponent(Radio, {
  Group,
});
