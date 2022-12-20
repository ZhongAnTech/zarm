import * as React from 'react';
import { renderImperatively } from '../utils/dom';
import ActionSheet, { ActionSheetProps } from './ActionSheet';

export const show = (props: Omit<ActionSheetProps, 'visible'>) => {
  return renderImperatively(<ActionSheet {...props} />);
};
