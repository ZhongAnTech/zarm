## Button 按钮
常用的操作按钮。

:::demo Button 组件提供5种主题，由`theme`属性来定义，默认为`default`。

```js
  render() {
    return (
      <div>
        <Button>default</Button>
        <Button theme="info">info</Button>
        <Button theme="success">success</Button>
        <Button theme="warning">warning</Button>
        <Button theme="error">error</Button>
      </div>
    )
  }
```
:::