import type { Locale } from '../n-config-provider/interface';

export default interface BaseSearchBarProps {
  shape?: 'rect' | 'radius' | 'round';
  buttonText?: string;
  showButton?: boolean;
  clearable?: boolean;
  onSubmit?: (value: string) => void;
  locale?: Locale['SearchBar'];
}
