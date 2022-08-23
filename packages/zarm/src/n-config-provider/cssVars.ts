import type { Replace } from '../utils/utilityTypes';
import type { ActionSheetCssVars } from '../action-sheet';
import type { ActivityIndicatorCssVars } from '../activity-indicator';
import type { AffixCssVars } from '../affix';
import type { BackTopCssVars } from '../back-top';
import type { BadgeCssVars } from '../badge';
import type { ButtonCssVars } from '../button';
import type { CalendarCssVars } from '../calendar';
import type { CarouselCssVars } from '../carousel';
import type { CheckboxCssVars, CheckboxGroupCssVars } from '../checkbox';
// import type { CollapseCssVars } from '../collapse';
// import type { CustomInputCssVars } from '../custom-input';
import type { GridCssVars } from '../grid';
import type { ImagePreviewCssVars } from '../image-preview';
// import type { InputCssVars } from '../input';
import type { KeyboardCssVars } from '../keyboard';
// import type { ListCssVars } from '../list';
// import type { LoadingCssVars } from '../loading';
// import type { MarqueeCssVars } from '../marquee';
import type { SliderCssVars } from '../slider';
import type { SwitchCssVars } from '../switch';
import type { ModalCssVars } from '../modal';
import type { IconCssVars } from '../icon';
import type { RateCssVars } from '../rate';
import type { PullCssVars } from '../pull';
import type { MaskCssVars } from '../mask';

type Prefix<T extends object, N extends string> = {
  [Key in keyof T as Key extends string ? `--za-${N}-${Replace<Key, '--', ''>}` : never]: T[Key];
};

export type CssVars = Prefix<ActionSheetCssVars, 'action-sheet'> &
  Prefix<ActivityIndicatorCssVars, 'activity-indicator'> &
  Prefix<AffixCssVars, 'affix'> &
  Prefix<GridCssVars, 'grid'> &
  Prefix<BackTopCssVars, 'back-top'> &
  Prefix<BadgeCssVars, 'badge'> &
  Prefix<ButtonCssVars, 'button'> &
  Prefix<CalendarCssVars, 'calendar'> &
  Prefix<CarouselCssVars, 'carousel'> &
  Prefix<CheckboxCssVars & CheckboxGroupCssVars, 'checkbox'> &
  // Prefix<CollapseCssVars, 'collapse'> &
  // Prefix<CustomInputCssVars, 'custom-input'> &
  Prefix<ImagePreviewCssVars, 'image-preview'> &
  // Prefix<InputCssVars, 'input'> &
  Prefix<KeyboardCssVars, 'keyboard'> &
  // Prefix<ListCssVars, 'list'> &
  // Prefix<LoadingCssVars, 'loading'> &
  // Prefix<MarqueeCssVars, 'marquee'> &
  Prefix<SliderCssVars, 'slider'> &
  Prefix<SwitchCssVars, 'switch'> &
  Prefix<ModalCssVars, 'modal'> &
  Prefix<IconCssVars, 'icon'> &
  Prefix<RateCssVars, 'rate'> &
  Prefix<PullCssVars, 'pull'> &
  Prefix<MaskCssVars, 'mask'>;
