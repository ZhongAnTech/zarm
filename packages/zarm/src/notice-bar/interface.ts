import type { BaseMessageProps } from '../message/interface';

export default interface BaseNoticeBarProps extends BaseMessageProps {
  speed?: number;
  delay?: number;
}
