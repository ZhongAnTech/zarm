import { SiteContext } from '.dumi/theme/slots/SiteContext';
import * as React from 'react';

export const useSiteContext = () => {
  return React.useContext(SiteContext);
};
