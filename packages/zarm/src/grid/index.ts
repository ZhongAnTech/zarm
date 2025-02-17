import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Grid from './Grid';
import Item from './Item';

export type { GridCssVars, GridProps } from './Grid';
export type { GridItemProps } from './Item';

export default attachPropertiesToComponent(Grid, {
  Item,
});
