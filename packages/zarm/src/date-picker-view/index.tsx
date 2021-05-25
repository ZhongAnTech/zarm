import DatePickerView from './DatePickerView';
import ConfigReceiver from '../config-receiver';

export type { DatePickerValue } from './PropsType';
export type { DatePickerViewProps } from './DatePickerView';

export default ConfigReceiver('DatePickerView')(DatePickerView);
