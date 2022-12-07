export default function attachPropertiesToComponent<C, P extends Record<string, any>>(
  component: C,
  properties: P,
): C & P {
  const ret = component as any;

  Object.keys(properties).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      ret[key] = properties[key];
    }
  });

  return ret;
}
