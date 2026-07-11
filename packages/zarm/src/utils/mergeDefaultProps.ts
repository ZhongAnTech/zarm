export default function mergeDefaultProps<Props>(
  defaults: Partial<Props> | undefined,
  props: Props,
): Props {
  if (!defaults) return props;

  const merged = { ...props };
  Object.keys(defaults).forEach((key) => {
    if ((merged as any)[key] === undefined) {
      (merged as any)[key] = (defaults as any)[key];
    }
  });
  return merged;
}
