import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import List from './List';
import Item from './ListItem';

export type { ListCssVars, ListProps } from './List';
export type { ListItemProps } from './ListItem';

export default attachPropertiesToComponent(List, { Item });
