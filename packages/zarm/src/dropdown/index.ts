import Dropdown from './Dropdown';
import Item from './DropdownItem';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { DropdownProps } from './Dropdown'
export type { DropdownItemProps } from './DropdownItem';

export default attachPropertiesToComponent(Dropdown, { Item });
