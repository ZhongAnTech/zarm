import SearchBar from './SearchBar';
import ConfigReceiver from '../config-receiver';

export type { SearchBarProps } from './SearchBar';

export default ConfigReceiver('SearchBar')(SearchBar);
