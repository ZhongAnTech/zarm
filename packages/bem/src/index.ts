export interface BEMConfig {
  prefixCls?: string;
  blockSeparator?: string;
  elementSeparator?: string;
  modifierSeparator?: string;
}

const defaultConfig: BEMConfig = {
  prefixCls: '',
  blockSeparator: '-',
  elementSeparator: '__',
  modifierSeparator: '--',
};

const BEMClassName = (name: string, config: BEMConfig) => {
  const { elementSeparator, modifierSeparator } = config;
  return (element?: string, modifiers?: []) => {
    if (element && typeof element !== 'string') {
      modifiers = element;
      element = '';
    }

    const newBlock = element ? name + elementSeparator + element : name;
    const classList = [newBlock];

    modifiers?.forEach((modifier) => {
      const modifierType = typeof modifier;
      switch (modifierType) {
        case 'string':
          classList.push(modifier);
          break;

        case 'object':
          Object.entries(modifier).forEach(([key, value]) => {
            if (value === true) {
              classList.push(newBlock + modifierSeparator + key);
            }
          });
          break;

        default:
          break;
      }
    });

    return classList.join(' ');
  };
};

export const createBEM = (name: string, config?: BEMConfig) => {
  config = { ...defaultConfig, ...config };
  const { prefixCls, blockSeparator } = config;
  const prefixedName = prefixCls ? prefixCls + blockSeparator + name : name;

  return BEMClassName(prefixedName, config);
};
