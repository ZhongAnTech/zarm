import List from './List';
import Item from './ListItem';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { ListProps, ListCssVars } from './List';
export type { ListItemProps } from './ListItem';

export default attachPropertiesToComponent(List, { Item });
