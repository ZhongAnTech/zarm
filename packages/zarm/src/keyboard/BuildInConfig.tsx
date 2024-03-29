import type { BaseKeyBoardProps, KeyBoardDataSource } from './interface';

const KeysConfig = {
  number: {
    columns: 4,
    keys: [
      '1',
      '2',
      '3',
      {
        text: 'delete',
        rowSpan: 2,
      },
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      {
        text: 'ok',
        rowSpan: 2,
      },
      '',
      '0',
      'close',
    ],
  },
  price: {
    columns: 4,
    keys: [
      '1',
      '2',
      '3',
      {
        text: 'delete',
        rowSpan: 2,
      },
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      {
        text: 'ok',
        rowSpan: 2,
      },
      '.',
      '0',
      'close',
    ],
  },
  idcard: {
    columns: 4,
    keys: [
      '1',
      '2',
      '3',
      {
        text: 'delete',
        rowSpan: 2,
      },
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      {
        text: 'ok',
        rowSpan: 2,
      },
      'X',
      '0',
      'close',
    ],
  },
} as Record<BaseKeyBoardProps['type'], KeyBoardDataSource>;

export default KeysConfig;
