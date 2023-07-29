import { useFullSidebarData } from 'dumi';
import { COMPONENT_PATH } from './constants';

export const useGroups = () => {
  const siderbars = useFullSidebarData();
  return siderbars[COMPONENT_PATH];
};
