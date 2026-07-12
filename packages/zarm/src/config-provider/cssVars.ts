import type { ActionSheetCssVars } from '../action-sheet';
import type { AffixCssVars } from '../affix';
import type { BackTopCssVars } from '../back-top';
import type { BadgeCssVars } from '../badge';
import type { ButtonCssVars } from '../button';
import type { CalendarCssVars } from '../calendar';
import type { CarouselCssVars } from '../carousel';
import type { CascaderCssVars } from '../cascader';
import type { CascaderViewCssVars } from '../cascader-view';
import type { CheckboxCssVars, CheckboxGroupCssVars } from '../checkbox';
import type { CollapseCssVars } from '../collapse';
import type { CustomInputCssVars } from '../custom-input';
import type { DateSelectCssVars } from '../date-select';
import type { FilePickerCssVars } from '../file-picker';
import type { GridCssVars } from '../grid';
import type { IconCssVars } from '../icon';
import type { ImageCssVars } from '../image';
import type { ImagePreviewCssVars } from '../image-preview';
import type { InputCssVars } from '../input';
import type { KeyboardCssVars } from '../keyboard';
import type { KeyboardPickerCssVars } from '../keyboard-picker';
import type { ListCssVars } from '../list';
import type { LoadingCssVars } from '../loading';
import type { MaskCssVars } from '../mask';
import type { MessageCssVars } from '../message';
import type { ModalCssVars } from '../modal';
import type { NavBarCssVars } from '../nav-bar';
import type { NoticeBarCssVars } from '../notice-bar';
import type { PanelCssVars } from '../panel';
import type { PickerCssVars } from '../picker';
import type { PickerViewCssVars } from '../picker-view';
import type { PopupCssVars } from '../popup';
import type { ProgressCssVars } from '../progress';
import type { PullCssVars } from '../pull';
import type { RadioCssVars, RadioGroupCssVars } from '../radio';
import type { RateCssVars } from '../rate';
import type { SearchBarCssVars } from '../search-bar';
import type { SelectCssVars } from '../select';
import type { SkeletonCssVars } from '../skeleton';
import type { SliderCssVars } from '../slider';
import type { StepperCssVars } from '../stepper';
import type { SwipeActionCssVars } from '../swipe-action';
import type { SwitchCssVars } from '../switch';
import type { TabBarCssVars } from '../tab-bar';
import type { TabsCssVars } from '../tabs';
import type { ToastCssVars } from '../toast';
import type { TooltipCssVars } from '../tooltip';
import type { Replace } from '../utils/utilityTypes';
import type { WheelCssVars } from '../wheel';

type Prefix<T extends object, N extends string> = {
  [Key in keyof T as Key extends string ? `--za-${N}-${Replace<Key, '--', ''>}` : never]?: T[Key];
};

export type CssVars = Prefix<ActionSheetCssVars, 'action-sheet'> &
  Prefix<LoadingCssVars, 'loading'> &
  Prefix<AffixCssVars, 'affix'> &
  Prefix<GridCssVars, 'grid'> &
  Prefix<BackTopCssVars, 'back-top'> &
  Prefix<BadgeCssVars, 'badge'> &
  Prefix<ButtonCssVars, 'button'> &
  Prefix<CalendarCssVars, 'calendar'> &
  Prefix<CarouselCssVars, 'carousel'> &
  Prefix<CascaderCssVars, 'cascader'> &
  Prefix<CheckboxCssVars & CheckboxGroupCssVars, 'checkbox'> &
  Prefix<CollapseCssVars, 'collapse'> &
  Prefix<CustomInputCssVars, 'custom-input'> &
  Prefix<DateSelectCssVars, 'date-select'> &
  Prefix<FilePickerCssVars, 'file-picker'> &
  Prefix<ImagePreviewCssVars, 'image-preview'> &
  Prefix<InputCssVars, 'input'> &
  Prefix<KeyboardCssVars, 'keyboard'> &
  Prefix<KeyboardPickerCssVars, 'keyboard-picker'> &
  Prefix<ListCssVars, 'list'> &
  Prefix<SliderCssVars, 'slider'> &
  Prefix<SwitchCssVars, 'switch'> &
  Prefix<ModalCssVars, 'modal'> &
  Prefix<IconCssVars, 'icon'> &
  Prefix<RateCssVars, 'rate'> &
  Prefix<MaskCssVars, 'mask'> &
  Prefix<PullCssVars, 'pull'> &
  Prefix<MessageCssVars, 'message'> &
  Prefix<NavBarCssVars, 'nav-bar'> &
  Prefix<NoticeBarCssVars, 'notice-bar'> &
  Prefix<PanelCssVars, 'panel'> &
  Prefix<PickerViewCssVars, 'picker-view'> &
  Prefix<PickerCssVars, 'picker'> &
  Prefix<PopupCssVars, 'popup'> &
  Prefix<SelectCssVars, 'select'> &
  Prefix<ProgressCssVars, 'progress'> &
  Prefix<RadioCssVars & RadioGroupCssVars, 'radio'> &
  Prefix<SearchBarCssVars, 'search-bar'> &
  Prefix<SkeletonCssVars, 'skeleton'> &
  Prefix<StepperCssVars, 'stepper'> &
  Prefix<SwipeActionCssVars, 'swipe-action'> &
  Prefix<TabsCssVars, 'tabs'> &
  Prefix<ToastCssVars, 'toast'> &
  Prefix<TooltipCssVars, 'tooltip'> &
  Prefix<WheelCssVars, 'wheel'> &
  Prefix<TabBarCssVars, 'tab-bar'> &
  Prefix<ImageCssVars, 'image'> &
  Prefix<CascaderViewCssVars, 'cascader-view'>;
