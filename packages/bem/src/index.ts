export interface BEMConfig {
  prefixCls?: string;
  blockSeparator?: string;
  elementSeparator?: string;
  modifierSeparator?: string;
  modifierValueSeparator?: string;
}

const defaultConfig: BEMConfig = {
  prefixCls: '',
  blockSeparator: '-',
  elementSeparator: '__',
  modifierSeparator: '--',
  modifierValueSeparator: '-',
};

type ModifierType = (string | undefined | { [x: string]: boolean | string | undefined })[];

const BEMClassName = (name: string, config: BEMConfig) => {
  const { elementSeparator, modifierSeparator, modifierValueSeparator } = config;

  return (element: string | ModifierType, modifiers?: ModifierType) => {
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
          classList.push(modifier as string);
          break;

        case 'object':
          Object.entries(modifier || {}).forEach(([key, value]) => {
            if (value === true) {
              classList.push(newBlock + modifierSeparator + key);
            } else if (value) {
              classList.push(newBlock + modifierSeparator + key + modifierValueSeparator + value);
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
