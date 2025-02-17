# `@zarm-design/bem`

## Usage in JS

```js
import { createBEM } from '@zarm-design/bem';

const bem = createBEM('button', { prefixCls: 'za' });

bem(); // za-button

bem([{ loading: true }, 'customClass']); // za-button za-button--loading customClass

bem('text'); // za-button__text

bem('text', ['customClass']); // za-button__text customClass

bem('text', [
  {
    theme: 'primary',
    block,
    loading: true,
    disabled: false,
  },
  'customClass',
]); // za-button__text za-button__text--theme-primary za-button__text--block za-button__text--loading customClass
```

## Usage in SASS

Input

```scss
@import '~@zarm-design/bem/sass';

// set classname prefix
$prefixCls: za;

@include b(button) {
  height: 40px;

  @include m(primary) {
    background: #00bc70;

    @include m(active) {
      opacity: 0.9;

      @include b(icon) {
        display: inline-block;
      }
    }
  }

  @include e(text) {
    color: #fff;

    @include m(disabled) {
      color: #ddd;
      cursor: not-allowed;
    }
  }
}
```

Output

```css
.za-button {
  height: 40px;
}
.za-button--primary {
  background: #00bc70;
}
.za-button--primary.za-button--active {
  opacity: 0.9;
}
.za-button--primary.za-button--active .za-icon {
  display: inline-block;
}
.za-button__text {
  color: #fff;
}
.za-button__text--disabled {
  color: #ddd;
  cursor: not-allowed;
}
```

## API

```js
const createBEM: (
  name: string,
  config?: BEMConfig,
) => (element: string | ModifierType, modifiers?: ModifierType) => string;
```

### ModifierType

```ts
type ModifierType = (string | undefined | { [x: string]: boolean | string | undefined })[];
```

### BEMConfig

```ts
interface BEMConfig {
  prefixCls?: string;
  blockSeparator?: string;
  elementSeparator?: string;
  modifierSeparator?: string;
  modifierValueSeparator?: string;
}
```

| 属性                   | 对应 SASS 变量     | 类型   | 默认值 | 说明           |
| :--------------------- | :----------------- | :----- | :----- | :------------- |
| prefixCls              | $prefixCls         | string | ''     | 类名前缀       |
| blockSeparator         | $blockSeparator    | string | '-'    | 模块连接符     |
| elementSeparator       | $elementSeparator  | string | '\_\_' | 元素连接符     |
| modifierSeparator      | $modifierSeparator | string | '--'   | 修饰符连接符   |
| modifierValueSeparator | -                  | string | '-'    | 修饰符值连接符 |
