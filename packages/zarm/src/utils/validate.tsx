export const isCascader = ({ dataSource }) => {
  return dataSource && dataSource[0] && !Array.isArray(dataSource[0]);
};
