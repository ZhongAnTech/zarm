import Grid from './Grid';
import Item from './Item';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { GridProps, GridCssVars } from './Grid';
export type { GridItemProps } from './Item';

export default attachPropertiesToComponent(Grid, {
  Item,
});
