import type { Replace } from '../utils/utilityTypes';
import type { ActionSheetCssVars } from '../action-sheet';
import type { ActivityIndicatorCssVars } from '../activity-indicator';
import type { AffixCssVars } from '../affix';
import type { BackTopCssVars } from '../back-top';
import type { BadgeCssVars } from '../badge';
import type { GridCssVars } from '../grid';
import type { SliderCssVars } from '../slider';
import type { SwitchCssVars } from '../switch';
import type { ModalCssVars } from '../modal';
import type { IconCssVars } from '../icon';
import type { RateCssVars } from '../rate';
import type { KeyboardCssVars } from '../keyboard';
import type { CalendarCssVars } from '../calendar';
import type { PullCssVars } from '../pull';

type Prefix<T extends object, N extends string> = {
  [Key in keyof T as Key extends string ? `--za-${N}-${Replace<Key, '--', ''>}` : never]: T[Key];
};

export type CssVars = Prefix<ActionSheetCssVars, 'action-sheet'> &
  Prefix<ActivityIndicatorCssVars, 'activity-indicator'> &
  Prefix<AffixCssVars, 'affix'> &
  Prefix<GridCssVars, 'grid'> &
  Prefix<BackTopCssVars, 'back-top'> &
  Prefix<BadgeCssVars, 'badge'> &
  Prefix<SliderCssVars, 'slider'> &
  Prefix<SwitchCssVars, 'switch'> &
  Prefix<ModalCssVars, 'modal'> &
  Prefix<IconCssVars, 'icon'> &
  Prefix<RateCssVars, 'rate'> &
  Prefix<KeyboardCssVars, 'keyboard'> &
  Prefix<CalendarCssVars, 'calendar'>&
  Prefix<PullCssVars, 'pull'>;
