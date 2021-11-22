import Grid from './Grid';
import Item from './Item';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { GridProps } from './Grid';

export default attachPropertiesToComponent(Grid, {
  Item,
});
