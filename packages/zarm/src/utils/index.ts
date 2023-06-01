export const noop = () => {};

export const toArray = <T>(value?: T | T[] | null): T[] => {
  value = value || [];
  return Array.isArray(value) ? value : [value];
};

// Borrowed from https://github.com/ai/nanoid/blob/3.0.2/non-secure/index.js
// This alphabet uses `A-Za-z0-9_-` symbols. A genetic algorithm helped
// optimize the gzip compression for this alphabet.
const urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';

export const nanoid = (size = 21) => {
  let id = '';
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size;
  // eslint-disable-next-line no-plusplus
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    // eslint-disable-next-line no-bitwise
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
};
