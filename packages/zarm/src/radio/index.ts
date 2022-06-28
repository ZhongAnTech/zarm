import Radio from './Radio';
import Group from './RadioGroup';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { RadioProps } from './Radio';
export type { RadioGroupProps } from './RadioGroup';

export default attachPropertiesToComponent(Radio, {
  Group,
});
