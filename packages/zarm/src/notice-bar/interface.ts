import type { BaseMessageProps } from '../message/interface';

export default interface BaseNoticeBarProps extends Omit<BaseMessageProps, 'theme'> {
  theme?: Exclude<BaseMessageProps['theme'], 'default'>;
  speed?: number;
  delay?: number;
}
