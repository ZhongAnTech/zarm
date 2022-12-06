import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import DatePicker from './DatePicker';
import { prompt } from './prompt';

export type { DatePickerProps } from './DatePicker';

export default attachPropertiesToComponent(DatePicker, { prompt });
