# `@zarm-design/bem`

## Usage in JS

```js
import { createBEM } from '@zarm-design/bem';

const bem = createBEM('button', { prefixCls: 'za' });

bem(); // za-button

bem(['customClass', { primary: true }]); // za-button za-button--primary customClass

bem('text'); // za-button__text

bem('text', ['customClass']); // za-button__text customClass

bem('text', [
  'customClass',
  {
    loading: true,
    disabled: false,
  },
]); // za-button__text za-button__loading--aaa customClass
```

## Usage in SASS

Input

```scss
@import '~@zarm-design/bem/sass';

@include b(button) {
  height: 40px;

  @include m(primary) {
    background: #00bc70;
  }

  @include e(text) {
    color: #fff;

    @include m(loading) {
      color: #ccc;
    }

    @include m(disabled) {
      color: #ddd;
      cursor: not-allowed;
    }
  }
}
```

Output

```
.za-button {
  height: 40px;
}

.za-button--primary {
  background: #00bc70;
}

.za-button__text {
  color: #fff;
}

.za-button__text--loading {
  color: #ccc;
}

.za-button__text--disabled {
  color: #ddd;
  cursor: not-allowed;
}
```

## API

```js
const createBEM: (name: string, config?: BEMConfig) => (element?: string, modifiers?: []) => string;
```

### config

| 属性              | 类型   | 默认值 | 说明     |
| :---------------- | :----- | :----- | :------- |
| prefixCls         | string | ''     | 类名前缀 |
| blockSeparator    | string | '-'    | 类名前缀 |
| elementSeparator  | string | '\_\_' | 类名前缀 |
| modifierSeparator | string | '--'   | 类名前缀 |
