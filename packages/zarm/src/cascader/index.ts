import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Cascader from './Cascader';
import { prompt } from './prompt';

export type { CascaderProps } from './Cascader';

export default attachPropertiesToComponent(Cascader, { prompt });
