
import Color from 'color';

export const darken = (color, percent) => {
  const hsl = Color(color).hsl();
  const l = hsl.color[2] - percent * 100;
  hsl.color[2] = l;
  return hsl.hex();
};
